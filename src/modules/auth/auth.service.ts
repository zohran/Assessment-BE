import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { UpdateUserDto, UserLoginDto } from '../user/dto';
import { comparePasswords } from '../../utils/bcypt';
import { getToken } from '../../utils/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async registerUser(registerUserDto: any): Promise<UserEntity> {
    return await this.userService.registerUser(registerUserDto);
  }

  async loginUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    try {
      const user = await this.userService.findUserByEmail(userLoginDto.email);

      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }

      const isMatch = await comparePasswords({
        password: userLoginDto.password,
        hashedPassword: user.password,
      });

      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const { accessToken, refreshToken } = getToken({
        email: user.email,
      });

      user.access_token = accessToken;
      user.refresh_token = refreshToken;

      return await this.userService.updateUser(user as UpdateUserDto);
    } catch (error) {
      throw error;
    }
  }
}
