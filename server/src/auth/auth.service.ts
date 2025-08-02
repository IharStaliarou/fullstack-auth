import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {}
  async signup(signupDto: SignUpDto) {
    const createdUser = await this.userService.create(signupDto);
    if (!createdUser) {
      throw new BadRequestException('Sign up error');
    }

    return createdUser;
  }
}
