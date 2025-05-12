import { ApiProperty } from "@nestjs/swagger";

export class CreateBlogDto {
    @ApiProperty({
        example: 'My First Blog Post',
        description: 'The title of the blog post'
    })
    title: string;

    @ApiProperty({
        example: 'This is the content of my first blog post...',
        description: 'The main content of the blog post'
    })
    content: string;

    @ApiProperty({
        example: true,
        description: 'Whether the blog post is published or in draft',
        default: true
    })
    isPublished: boolean;
}
