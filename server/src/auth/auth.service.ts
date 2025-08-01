import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  signup(newUser: Partial<User>) {
    const { username, password, firstName, lastName, email, phone } = newUser;
    return this.prismaService.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
      },
    });
  }
}
