import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);

    const userData = { ...createUserDto, password: hashedPassword };
    delete userData.repeatPassword;

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((error) => {
        throw new BadRequestException('Error creating user');
      });
    delete newUser.password;

    return newUser;
  }
  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string) {
    return this.prismaService.user
      .findUnique({
        where: { username },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        delete foundedUser.password;
        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('User with this username is not found');
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        delete foundedUser.password;
        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('User with this email is not found');
      });
  }

  findByPhone(phone: string) {
    return this.prismaService.user
      .findUnique({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) return null;
        delete foundedUser.password;
        return foundedUser;
      })
      .catch((error) => {
        throw new NotFoundException('User with this phone is not found');
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
