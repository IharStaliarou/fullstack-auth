import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  signup(signupDto: SignUpDto) {
    const createUserDto = signupDto;
    delete createUserDto.repeatPassword;
    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }
}
