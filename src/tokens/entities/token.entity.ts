import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document, HydratedDocument, ObjectId } from 'mongoose';
import { TokenType } from '../enum/type.enum';
import { User } from 'src/users/entities/user.entity';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token extends Document {
	@Prop()
	@ApiProperty({})
	token: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: User.name
	})
	user: ObjectId;

	@Prop()
	type: TokenType;

	@Prop()
	@ApiProperty({})
	expires: Date;

	@Prop()
	blacklisted: boolean;
}
