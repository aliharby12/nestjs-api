import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule { }
