import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';
import { AuthDto } from './dto/auth.dto';
import { TokenType } from 'src/tokens/enum/type.enum';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly tokensService: TokensService) {}

	/**
	 * Login to account with email and password
	 * @param loginDto 
	 * @returns 
	 */
	async loginUserWithEmailAndPassword(
		loginDto: LoginDto
	): Promise<User> {
		const user = await this.usersService.findOneByEmail(loginDto.email);

		if (!user || !(await user.isPasswordMatch(loginDto.password))) {
			throw new UnauthorizedException('Incorrect email or password');
		}

		return user;
	}

	async refreshAuth(authDto: AuthDto) {
		try {
			const refreshToken = await this.tokensService.verifyToken(authDto.refreshToken, TokenType.REFRESH);
			console.log(`refreshToken.user: ${refreshToken.user}`);

			const user = await this.usersService.findOne(+refreshToken.user)
			if (!user) {
				throw new Error();
			}

			await this.tokensService.deleteRefreshToken(refreshToken.token);
			return this.tokensService.generateAuthTokens(user);
		} catch (error) {

		}
	}

	async resetPassword(resetPasswordToken: string, newPassword: string) {
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		throw new NotImplementedException();
	}
}
