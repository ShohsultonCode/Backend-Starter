import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers?.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1];

      try {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const decoded = this.jwtService.verify(token, { secret: jwtSecret });

        request.user = decoded;
        return true;
      } catch (error) {
        console.error('JWT verification error:', error.message);
        throw new UnauthorizedException('Unauthorized');
      }
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
