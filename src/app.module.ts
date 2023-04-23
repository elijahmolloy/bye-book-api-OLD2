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
					schema.pre('save', async function (next) {
						const user = this;
						if (user.isModified('_password')) {
							user._password = await bcrypt.hash(
								user._password,
								12
							);
						}
						next();
					});

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
