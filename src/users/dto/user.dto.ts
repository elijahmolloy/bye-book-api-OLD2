import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }

    @ApiProperty({})
    id: string;

    @ApiProperty({})
    firstName: string;

    @ApiProperty({})
    lastName: string;

    @ApiProperty({})
    email: string;

    @ApiProperty({})
    isEmailVerified: boolean;
}