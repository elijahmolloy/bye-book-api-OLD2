import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
	@Prop()
	@ApiProperty({})
	firstName: string;

	@Prop()
	@ApiProperty({})
	lastName: string;

	@Prop({ index: true, unique: true })
	@ApiProperty({})
	email: string;

	@Prop({ select: true })
	_password: string;

	@Prop()
	@ApiProperty({})
	isEmailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
