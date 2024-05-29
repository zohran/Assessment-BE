import { sign, verify } from 'jsonwebtoken';
import { JWTTokenInput, JWTTokenResponse } from '../modules/auth/dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  JWT_ACCESS_TOKEN_VALIDITY,
  JWT_REFRESH_TOKEN_VALIDITY,
} from 'src/constants';
import { config } from 'dotenv';
config();

export const getToken = (payload: JWTTokenInput): JWTTokenResponse => {
  const [accessToken, refreshToken] = [
    sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_VALIDITY,
    }),
    sign(payload, process.env.JWT_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_VALIDITY,
    }),
  ];

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
  }
};
