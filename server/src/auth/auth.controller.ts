import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './guards/jwt.auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    const createdUser = await this.authService.signup(signupDto);

    if (!createdUser) {
      const errorMessage = 'Error creating user';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    return createdUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const errorMessage = 'Error logging in';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }

    return tokens;
  }
}
