import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import { Model, Types } from 'mongoose';
import { RegisterUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userRepository: Model<UserEntity>,
  ) {}

  async registerUser(registerUser: RegisterUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        email: registerUser.email,
      });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }

      const newUser = new this.userRepository(registerUser);
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: Types.ObjectId): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        email: email,
      });
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({});
      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findById(updateUserDto.id);
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
      user.username = updateUserDto?.username;
      user.email = updateUserDto?.email;
      user.password = updateUserDto?.password;

      return user.save();
    } catch (error) {
      throw error;
    }
  }
}
