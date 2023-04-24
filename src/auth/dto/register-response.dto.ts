import { ApiProperty } from "@nestjs/swagger";
import { AuthTokensDto } from "src/tokens/dto/auth-tokens-response.dto";
import { UserDto } from "src/users/dto/user.dto";

export class AuthResponse {
    constructor(partial: Partial<AuthResponse>) {
        Object.assign(this, partial);
    }

    @ApiProperty({})
    user: UserDto;

    @ApiProperty({})
    tokens: AuthTokensDto
}