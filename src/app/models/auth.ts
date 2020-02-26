export interface Auth {
  grant_type: string;
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}
