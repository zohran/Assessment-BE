import { compare } from 'bcrypt';
import { ComparePasswordInput } from '../modules/auth/dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hash } from 'bcrypt';
import { HASH_SALT } from 'src/constants';

export const comparePasswords = async (
  comparePasswordInput: ComparePasswordInput,
): Promise<boolean> => {
  try {
    return await compare(
      comparePasswordInput.password,
      comparePasswordInput.hashedPassword,
    );
  } catch (error) {
    throw new HttpException(
      'Error while authenicating password',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return hash(password, HASH_SALT);
  } catch (error) {
    throw new HttpException(
      'Error occurred while hashing',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
};
