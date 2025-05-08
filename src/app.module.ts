import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    BlogModule,
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE || 'postgres') as 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql' | 'oracle',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Blog],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
