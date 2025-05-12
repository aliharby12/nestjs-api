export class Blog { }

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the blog post'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'My First Blog Post',
        description: 'The title of the blog post'
    })
    @Column()
    title: string;

    @ApiProperty({
        example: 'This is the content of my first blog post...',
        description: 'The main content of the blog post'
    })
    @Column()
    content: string;

    @ApiProperty({
        example: true,
        description: 'Whether the blog post is published or in draft',
        default: true
    })
    @Column({ default: true })
    isPublished: boolean;

    @ApiProperty({
        example: '2023-01-01T00:00:00Z',
        description: 'The timestamp when the blog post was created'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        example: '2023-01-01T00:00:00Z',
        description: 'The timestamp when the blog post was last updated'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty({
        example: '2023-01-01T00:00:00Z',
        description: 'The timestamp when the blog post was deleted (soft delete)',
        nullable: true
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deletedAt: Date;
}