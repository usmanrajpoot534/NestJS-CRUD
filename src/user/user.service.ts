import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const recs = await this.prisma.user.findMany({
      where: {
        email: { contains: createUserDto.email },
      },
    });
    if (recs.length > 0) {
      throw new ConflictException('Email Already Exists');
    }
    await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        age: createUserDto.age,
        email: createUserDto.email,
      },
    });
    return 'New User created successfully';
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { isDeleted: false },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { userId: id },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    await this.prisma.user.update({
      where: { userId: id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        age: updateUserDto.age,
      },
    });
    return 'User updated successfully';
  }

  async delete(id: number) {
    await this.prisma.user.update({
      where: { userId: id },
      data: {
        isDeleted: true,
      },
    });

    return 'User deleted successfully';
  }
}
