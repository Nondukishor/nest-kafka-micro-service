import { Controller, Post, Body, Header, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { config } from '../config/configuration';
import * as jwt from 'jsonwebtoken';
import { Res } from '@nestjs/common/decorators';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.userCreation')
  async create(@Payload() signupData: any) {
    const isUserExits = await this.usersService.isUserExits(signupData.emailId);
    if (isUserExits !== null) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'You have already registered.',
      };
    } else {
      signupData.password = await bcrypt.hash(
        signupData.password,
        config.saltOrRounds,
      );

      try {
        return await this.usersService
          .createUser(signupData)
          .then(() => {
            return {
              status: HttpStatus.OK,
              message: 'You have successfully registered.',
            };
          })
          .catch(() => {
            return {
              status: HttpStatus.BAD_REQUEST,
              message: 'Inavlid details provided!',
            };
          });
      } catch {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Inavlid details provided!',
        };
      }
    }
  }

  @MessagePattern('users.login')
  async login(@Payload() loginData) {
    console.log('MessagePattern:users.login');
    const dbData = await this.usersService.isUserExits(loginData.emailId);
    if (dbData !== null) {
      const isMatch = await bcrypt.compare(loginData.password, dbData.password);
      if (isMatch) {
        const token = await this.tokenGenerator(dbData);
        return {
          status: HttpStatus.OK,
          token: token,
          id: dbData._id,
        };
      } else {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Inavlid credentials!',
        };
      }
    } else {
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Inavlid credentials!',
      };
    }
  }
  async tokenGenerator(data: any) {
    const payload = {
      userId: data._id.toString(),
      userIdObject: data._id,
      emailId: data.emailId,
      firstName: data.firstName,
    };
    const secret = config.JWTsecret;
    const options = config.JWToptios;

    const token = jwt.sign(payload, secret, options);
    return token;
  }
  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, config.JWTsecret, function (err, data) {
      if (err) {
        return err;
      }
      return data;
    });
  }
}
