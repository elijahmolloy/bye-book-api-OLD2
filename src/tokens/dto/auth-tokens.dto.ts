export class AuthTokens {
	constructor(partial: Partial<AuthTokens>) {
		Object.assign(this, partial);
	}

	access: AuthToken;
	refresh: AuthToken;
}

export class AuthToken {
	constructor(partial: Partial<AuthToken>) {
		Object.assign(this, partial);
	}

	token: string;
	expires: Date;
}
