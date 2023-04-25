import { BadRequestException, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>
	) {}

	/**
	 * Attempt to create a new user account if email address is not already taken
	 * @param createUserDto
	 * @returns
	 */
	async create(createUserDto: CreateUserDto) {
		if (await this.isEmailTaken(createUserDto.email)) {
			throw new BadRequestException('Email is taken');
		}

		return await new this.userModel(createUserDto).save();
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email: email });
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}

	private async isEmailTaken(email: string): Promise<boolean> {
		const user = await this.userModel.findOne({ email });

		return !!user;
	}
}
