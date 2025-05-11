import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(+id);
  }

  @Patch('id')
  updateOne(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    console.log(id)
    return this.blogService.updateOne(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(+id);
  }
}
