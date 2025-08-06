import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '@user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}
  signup(signupDto: SignUpDto) {
    const createUserDto = signupDto;
    delete createUserDto.repeatPassword;
    const createdUser = this.userService.create(createUserDto);
    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user: User = await this.userService
      .findByUsername(username)
      .catch((error) => {
        this.logger.error(error);
        return null;
      });

    if (!user) {
      const errorMessage = 'User not found';
      this.logger.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    const isPasswordMatch = compareSync(password, user?.password);

    if (!isPasswordMatch) {
      const errorMessage = 'Incorrect password. Please try again.';
      this.logger.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    const accessToken = this.jwtService.sign({
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const refreshToken: Token = await this.getRefreshToken(user.id);

    const tokens = {
      accessToken,
      refreshToken,
    };

    return tokens;
  }

  private getRefreshToken = async (userId: string) => {
    const currentDate = dayjs();

    const expirationValue = this.configService.get('TOKEN_EXPIRATION_VALUE');
    const expirationUnit = this.configService.get('TOKEN_EXPIRATION_UNIT');

    const expirationDate = currentDate
      .add(expirationValue, expirationUnit)
      .toDate();
    return await this.prismaService.token.create({
      data: {
        token: v4(),
        exp: expirationDate,
        userId,
      },
    });
  };
}
