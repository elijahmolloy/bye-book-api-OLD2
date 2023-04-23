import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
	@Prop()
	@ApiProperty({})
	firstName: string;

	@Prop()
	@ApiProperty({})
	lastName: string;

	@Prop()
	@ApiProperty({})
	emailAddress: string;

	@Prop()
	_password: string;

	@Prop()
	@ApiProperty({})
	isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
