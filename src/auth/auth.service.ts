import { Injectable, NotImplementedException } from '@nestjs/common';
import { ApiNotImplementedResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
	constructor() {}

	async loginUserWithEmailAndPassword(
		email: string,
		password: string
	): Promise<User> {
		throw new NotImplementedException();
	}

	async logout(refreshToken: string) {
		throw new NotImplementedException();
	}

	async refreshAuth(refreshToken: string) {
		throw new NotImplementedException();
	}

	async resetPassword(resetPasswordToken: string, newPassword: string) {
		throw new NotImplementedException();
	}

	async verifyEmail(verifyEmailToken: string) {
		throw new NotImplementedException();
	}
}
