import { ITokenStructured } from './../../common/types/funtion.interface';
import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { ILoginReturn } from './interface/login';
import { verifyGoogleUser } from './google/auth';
import { Users } from 'src/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  //Login with Google account
  async loginWithGoogle(token: string): Promise<ILoginReturn> {
    
    const { userId, email, name } = await verifyGoogleUser(token);
    
    if (!userId || !email) throw new BadRequestException();

    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      const userToken: ITokenStructured = {
        id: user.id,
        email: user.email,
      };
      const jwtToken = await this.jwtService.signAsync(userToken, {
        expiresIn: '2d',
      });
      return { token: jwtToken, profile: user };
    }
    const newUser = await this.usersRepository.create(
      {
        email,
        name,
      },
    );

    const userToken: ITokenStructured = {
      id: newUser.id,
      email: newUser.email,
    };

    const jwtToken = await this.jwtService.signAsync(userToken, {
      expiresIn: '2d',
    });
    return { token: jwtToken, profile: newUser };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id:number){
    return `Ask something to learn about fucking programming`
  }
}
