import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { User, UserSchema } from './users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: () => {
					const schema = UserSchema;

					/**
					 * Hash password anytime it has changed (for new accounts and for password edits on existing accounts)
					 */
					schema.pre('save', async function (next) {
						const user = this;
						if (user.isModified('password')) {
							user.password = await bcrypt.hash(
								user.password,
								12
							);
						}
						next();
					});

					/**
					 * Determine if input password matches stored user account password 
					 * @param password 
					 * @returns 
					 */
					schema.methods.isPasswordMatch = async function (password: string) {
						const user = this;
						return await bcrypt.compare(password, user.password);
					}

					return schema;
				}
			}
		]),
		AuthModule,
		UsersModule,
		TokensModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
