import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { User } from 'src/users/entities/user.entity';
import { TokenType } from './enum/type.enum';
import * as jwt from 'jsonwebtoken';
import { AuthTokenDto, AuthTokensDto } from './dto/auth-tokens-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './entities/token.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokensService {
	/**
	 * 
	 * @param tokenModel 
	 * @param usersService 
	 */
	constructor(
		@InjectModel(Token.name) private readonly tokenModel: Model<Token>,
		private readonly usersService: UsersService
	) {}

	/**
	 * 
	 * @param userId 
	 * @param expires 
	 * @param type 
	 * @returns 
	 */
	generateToken(
		userId: string,
		expires: moment.Moment,
		type: TokenType
	): string {
		const payload = {
			sub: userId,
			iat: moment().unix(),
			exp: expires.unix(),
			type: type
		};

		return jwt.sign(payload, process.env.JWT_SECRET);
	}

	/**
	 * 
	 * @param token 
	 * @param userId 
	 * @param expires 
	 * @param type 
	 * @param blacklisted 
	 * @returns 
	 */
	async saveToken(
		token: string,
		userId: string,
		expires: moment.Moment,
		type: TokenType,
		blacklisted = false
	): Promise<Token> {
		return await this.tokenModel.create({
			token,
			user: userId,
			expires: expires.toDate(),
			type,
			blacklisted
		});
	}

	/**
	 * 
	 * @param token 
	 * @param type 
	 * @returns 
	 */
	async verifyToken(token: string, type: TokenType): Promise<Token> {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const tokenDocument = await this.tokenModel.findOne({
			token,
			type,
			user: payload.sub,
			blacklisted: false
		});

		if (!tokenDocument) {
			throw new Error('Token not found');
		}

		return tokenDocument;
	}

	/**
	 * 
	 * @param user 
	 * @returns 
	 */
	async generateAuthTokens(user: User): Promise<AuthTokensDto> {
		const accessTokenExpires = moment().add(
			process.env.ACCESS_EXPIRATION_MINUTES,
			'minutes'
		);
		const accessToken = await this.generateToken(
			user.id,
			accessTokenExpires,
			TokenType.ACCESS
		);

		const refreshTokenExpires = moment().add(
			process.env.REFRESH_EXPIRATION_DAYS,
			'days'
		);
		const refreshToken = await this.generateToken(
			user.id,
			refreshTokenExpires,
			TokenType.REFRESH
		);
		await this.saveToken(
			refreshToken,
			user.id,
			refreshTokenExpires,
			TokenType.REFRESH
		);

		return new AuthTokensDto({
			access: new AuthTokenDto({
				token: accessToken,
				expires: accessTokenExpires.toDate()
			}),
			refresh: new AuthTokenDto({
				token: refreshToken,
				expires: refreshTokenExpires.toDate()
			})
		});
	}

	/**
	 * 
	 * @param email 
	 * @returns 
	 */
	async generateResetPasswordToken(email: string): Promise<string> {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}

		const expires = moment().add(
			process.env.RESET_PASSWORD_EXPIRATION_MINUTES,
			'minutes'
		);
		const resetPasswordToken = this.generateToken(
			user.id,
			expires,
			TokenType.RESET_PASSWORD
		);
		await this.saveToken(
			resetPasswordToken,
			user.id,
			expires,
			TokenType.RESET_PASSWORD
		);

		return resetPasswordToken;
	}

	/**
	 * 
	 * @param user 
	 * @returns 
	 */
	async generateVerifyEmailToken(user: User): Promise<string> {
		const expires = moment().add(
			process.env.VERIFY_EMAIL_EXPIRATION_MINUTES,
			'minutes'
		);
		const verifyEmailToken = this.generateToken(
			user.id,
			expires,
			TokenType.VERIFY_EMAIL
		);
		await this.saveToken(
			verifyEmailToken,
			user.id,
			expires,
			TokenType.VERIFY_EMAIL
		);

		return verifyEmailToken;
	}
}
