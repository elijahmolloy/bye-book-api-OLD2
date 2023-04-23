import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiNotImplementedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokensService } from 'src/tokens/tokens.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
		private readonly tokensService: TokensService
	) {}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersService.create(createUserDto);
		const tokens = await this.tokensService.generateAuthTokens(user);
		// TokensService.generateAuthTokens

		return ApiNotImplementedResponse();
	}

	@Post('login')
	async login() {
		return ApiNotImplementedResponse();
	}

	@Post('logout')
	async logout() {
		return ApiNotImplementedResponse();
	}

	@Post('refresh-tokens')
	async refreshTokens() {
		return ApiNotImplementedResponse();
	}

	@Post('forgot-password')
	async forgotPassword() {
		return ApiNotImplementedResponse();
	}

	@Post('reset-password')
	async resetPassword() {
		return ApiNotImplementedResponse();
	}

	@Post('send-verification-email')
	async sendVerificationEmail() {
		return ApiNotImplementedResponse();
	}

	@Post('verify-email')
	async verifyEmail() {
		return ApiNotImplementedResponse();
	}
}
