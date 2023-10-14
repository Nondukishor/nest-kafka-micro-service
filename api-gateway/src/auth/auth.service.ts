import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import {
  LOGIN,
  SIGN_UP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGOUT,
} from '../config/messages';
import { LogoutDto } from './dto/logout.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  signUp(createUserDto: SignUpDto) {
    this.authClient.send(SIGN_UP, JSON.stringify(createUserDto));
  }

  login(loginDto: LoginDto) {
    this.authClient.send(LOGIN, JSON.stringify(loginDto));
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    this.authClient.send(FORGOT_PASSWORD, JSON.stringify(forgotPasswordDto));
  }

  resetPassword(forgotPasswordDto: ResetPasswordDto) {
    this.authClient.send(RESET_PASSWORD, JSON.stringify(forgotPasswordDto));
  }

  logout(logoutDto: LogoutDto) {
    this.authClient.send(LOGOUT, JSON.stringify(logoutDto));
  }
}
