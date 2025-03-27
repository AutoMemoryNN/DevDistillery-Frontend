export interface LoginResponse {
	token: string;
	isNewUser: boolean;
}

export interface SessionData {
	username: string;
	alias: string;
	email: string;
}
