import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';

@Injectable()
export class AppService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): void {
    this.usersRepository.save(data);
    console.log('data', { name: 'abul' });
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id);
  }
}
