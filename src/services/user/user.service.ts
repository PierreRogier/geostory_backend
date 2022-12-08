import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@core/entities';
import { CreateUserDto, UpdateUserDto } from '@core/dtos';
import {
  UniqueEmailException,
  ServerException,
  UserNotFoundException,
} from '@exceptions';
import { PostgresErrorsCode } from '@errors';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorsCode.UniqueViolation) {
        throw new UniqueEmailException();
      }
      throw new ServerException();
    }
  }

  async findAllUsers() {
    const users = this.userRepository.find();
    return users;
  }

  async findAllUsersInDistrict(districtId: number) {
    const users = this.userRepository.find({
      where: { district: { id: districtId } },
    });
    return users;
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!!user) return user;
    throw new UserNotFoundException();
  }

  async findUserByIdWithDistrict(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['district'],
    });
    if (!!user) return user;
    throw new UserNotFoundException();
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!!user) return user;
    throw new UserNotFoundException();
  }

  async findUserByEmailWithDistrict(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['district'],
    });
    if (!!user) return user;
    throw new UserNotFoundException();
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id: userId }, updateUserDto);
    return await this.findUserById(userId);
  }

  async removeUser(userId: number) {
    const deletedUserRole = await this.userRepository.delete({
      id: userId,
    });
    if (!deletedUserRole.affected) {
      throw new UserNotFoundException();
    }
  }
}
