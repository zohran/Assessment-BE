import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, UserLoginDto } from '../user/dto';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register-user')
  async createUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> {
    const user = await this.authService.registerUser(registerUserDto);
    return user;
  }

  @Post('/login')
  async loginUser(@Body() userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.authService.loginUser(userLoginDto);
    return user;
  }
}
