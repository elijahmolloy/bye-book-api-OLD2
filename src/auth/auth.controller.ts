import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiNotImplementedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register() {
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
