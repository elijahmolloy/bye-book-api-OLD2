import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
		UsersModule
	],
	providers: [TokensService],
	exports: [TokensService]
})
export class TokensModule {}
