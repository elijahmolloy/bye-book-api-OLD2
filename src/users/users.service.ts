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
		// return await this.userModel.
		return `This action returns all users`;
	}

	/**
	 * 
	 * @param id 
	 * @returns 
	 */
	async findOne(id: number): Promise<User> {
		return await this.userModel.findById(id);
	}

	/**
	 * 
	 * @param email 
	 * @returns 
	 */
	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email: email });
	}

	/**
	 * 
	 * @param id 
	 * @param updateUserDto 
	 * @returns 
	 */
	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	/**
	 * 
	 * @param id 
	 */
	async remove(id: number) {
		const deletedUser = await this.userModel.findByIdAndDelete(id);

		if (!deletedUser) {
			throw new BadRequestException();
		}
	}

	/**
	 * 
	 * @param email 
	 * @returns 
	 */
	private async isEmailTaken(email: string): Promise<boolean> {
		const user = await this.userModel.findOne({ email });

		return !!user;
	}
}
