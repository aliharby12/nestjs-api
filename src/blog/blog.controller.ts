import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBadRequestResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Post as BlogPost } from './entities/blog.entity';
import { AuthGuard } from '@nestjs/passport';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiCreatedResponse({ description: 'The blog post has been successfully created.', type: BlogPost })
  @UsePipes(ValidationPipe)
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'Return all blog posts', type: [BlogPost] })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<Pagination<BlogPost>> {
    const options: IPaginationOptions = { page: page, limit: limit };
    return await this.blogService.paginate(options);
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
  @UsePipes(ValidationPipe)
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
