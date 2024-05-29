import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ParseObjectIdPipe } from 'nestjs-object-id';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async findUsers(): Promise<UserEntity[]> {
    try {
      return await this.userService.findUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findUserById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<UserEntity> {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw error;
    }
  }
}
