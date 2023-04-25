import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiNotImplementedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';
import { AuthResponse } from './dto/register-response.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthTokenDto, AuthTokensDto } from 'src/tokens/dto/auth-tokens-response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
		private readonly tokensService: TokensService
	) {}

	/**
	 * Register a new account
	 * @param createUserDto 
	 * @returns 
	 */
	@Post('register')
	async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
		const user = await this.usersService.create(createUserDto);
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthResponse({
			user: new UserDto({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}),
			tokens
		});
	}

	/**
	 * Login to an existing account
	 * @param loginDto 
	 * @returns 
	 */
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
		const user = await this.authService.loginUserWithEmailAndPassword(loginDto)
		const tokens = await this.tokensService.generateAuthTokens(user);

		return new AuthResponse({
			user: new UserDto({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				isEmailVerified: user.isEmailVerified
			}),
			tokens
		});
	}

	@Post('logout')
	async logout(@Body() authDto: AuthDto) {
		await this.tokensService.deleteRefreshToken(authDto.refreshToken);
	}

	@Post('refresh-tokens')
	async refreshTokens() {
		throw new NotImplementedException();
	}

	@Post('forgot-password')
	async forgotPassword() {
		throw new NotImplementedException();
	}

	@Post('reset-password')
	async resetPassword() {
		throw new NotImplementedException();
	}

	@Post('send-verification-email')
	async sendVerificationEmail() {
		throw new NotImplementedException();
	}

	@Post('verify-email')
	async verifyEmail() {
		throw new NotImplementedException();
	}
}
