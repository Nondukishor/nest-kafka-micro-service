import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';

@Injectable()
export class UserService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientKafka,
  ) {}
  async onApplicationShutdown() {
    await this.usersService.close();
  }

  async onModuleInit() {
    const requestPatterns = ['users.userCreation', 'users.login'];
    requestPatterns.forEach((pattern) => {
      this.usersService.subscribeToResponseOf(pattern);
    });
    await this.usersService.connect();
  }

  async userCreation(signupData: any) {
    return await new Promise<any>((resolve) =>
      this.usersService
        .send('users.userCreation', signupData)
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        }),
    );
  }

  async login(data: any) {
    return await new Promise<any>((resolve) =>
      this.usersService.send('users.login', data).subscribe(async (data) => {
        console.log(data);
        resolve(data);
      }),
    );
  }
}
