import { Injectable, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async loginUserWithEmailAndPassword(
		loginDto: LoginDto
	): Promise<User> {
		const user = await this.usersService.findOneByEmail(loginDto.email);

		if (!user || !(await user.isPasswordMatch(loginDto.password))) {
			throw new UnauthorizedException('Incorrect email or password');
		}

		return user;
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
