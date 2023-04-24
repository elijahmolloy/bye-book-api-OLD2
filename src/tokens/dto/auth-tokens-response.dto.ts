export class AuthTokensDto {
	constructor(partial: Partial<AuthTokensDto>) {
		Object.assign(this, partial);
	}

	access: AuthTokenDto;
	refresh: AuthTokenDto;
}

export class AuthTokenDto {
	constructor(partial: Partial<AuthTokenDto>) {
		Object.assign(this, partial);
	}

	token: string;
	expires: Date;
}
