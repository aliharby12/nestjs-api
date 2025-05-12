import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Post } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }
  async create(createBlogDto: CreateBlogDto) {
    return await this.postsRepository.save(createBlogDto);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post | null > {
    return await this.postsRepository.findOneBy({ id });
  }

  async updateOne(id: number, updateBlogDto: UpdateBlogDto): Promise<Post | null > {
    const post = this.postsRepository.findOneBy({ id });
    return await post
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id)
  }
}
