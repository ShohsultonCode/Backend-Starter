import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithGoogleDto } from './dto/login-with-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: LoginWithGoogleDto) {
    return this.authService.loginWithGoogle(body.token);
  }
}
