import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBadRequestResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { Post as BlogPost } from './entities/blog.entity';

@ApiTags('posts')
@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiCreatedResponse({ description: 'The blog post has been successfully created.', type: BlogPost })
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'Return all blog posts', type: [BlogPost] })
  async findAll() {
    return await this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by id' })
  @ApiResponse({ status: 200, description: 'Return the blog post', type: BlogPost })
  async findOne(@Param('id') id: number) {
    return await this.blogService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post' })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully updated.', type: BlogPost })
  @ApiProperty({
    example: {
      title: 'Updated Blog Post Title',
      content: 'Updated content of my blog post'
    },
    description: 'Blog post update data'
  })
  async updateOne(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    const updatedPost = await this.blogService.updateOne(+id, updateBlogDto);
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post' })
  @ApiResponse({ status: 200, description: 'The blog post has been successfully deleted.' })
  async remove(@Param('id') id: number) {
    await this.blogService.remove(+id);
    return { message: 'Post deleted successfully' };
  }
}
