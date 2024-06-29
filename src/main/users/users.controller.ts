import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/common';
import { Throttle } from '@nestjs/throttler';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Get()
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

}
