import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { UserRole } from '../enum/role.enum';
import * as bcrypt from 'bcrypt';
import { NotImplementedException } from '@nestjs/common';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {	
	constructor(partial: Partial<User>) {
		super();
		Object.assign(this, partial);
	}

	@Prop({ required: true, trim: true })
	firstName: string;

	@Prop({ required: true, trim: true })
	lastName: string;

	@Prop({ index: true, unique: true, trim: true, lowercase: true })
	email: string;

	@Prop({ required: true, trim: true })
	password: string;

	@Prop({ default: false})
	isEmailVerified: boolean;

	@Prop({ default: UserRole.USER })
	role: UserRole

	/**
	 * This method is intentionally left blank. It is defined in main.module.ts 
	 * so that it can be called directly from a user entity.
	 * @param password 
	 */
	async isPasswordMatch(password: string): Promise<boolean> {
		throw new NotImplementedException();
	}

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.isPasswordMatch = async function (password: string) {
	const user = this;
	return await bcrypt.compare(password, user.password);
};
