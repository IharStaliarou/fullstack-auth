import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '@user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const existingUserByUsername = await this.userService.findByUsername(
      signupDto.username
    );
    if (existingUserByUsername) {
      throw new ConflictException('User with this username already exists');
    }

    const existingUserByEmail = await this.userService.findByEmail(
      signupDto.email
    );
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const existingUserByPhone = await this.userService.findByPhone(
      signupDto.phone
    );
    if (existingUserByPhone) {
      throw new ConflictException('User with this phone already exists');
    }

    const createdUser = await this.authService.signup(signupDto);

    return createdUser;
  }

  @Post('login')
  login() {
    return 'login';
  }
}
