import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const createdUser = await this.authService.signup(signupDto);

    return createdUser;
  }

  @Post('login')
  login() {
    return 'login';
  }
}
