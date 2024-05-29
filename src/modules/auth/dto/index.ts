import { IsNotEmpty } from 'class-validator';

export class JWTTokenInput {
  @IsNotEmpty()
  email: string;
}

export class JWTTokenResponse {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}

export class ComparePasswordInput {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  hashedPassword: string;
}
