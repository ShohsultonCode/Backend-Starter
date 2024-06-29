import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/common';

@Module({
  imports: [
    ConfigModule.forRoot({  
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST', 'localhost'),
          port: configService.get<number>('MYSQL_PORT', 3306),
          username: configService.get<string>('MYSQL_USERNAME', 'root'),
          password: configService.get<string>('MYSQL_PASSWORD', 'MYSQL_PASSWORD'),
          database: configService.get<string>(isProduction ? 'MYSQL_DB_PROD' : 'MYSQL_DB_DEV'),
          entities: [Users],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    
  ],
})
export class DatabaseModule {}
