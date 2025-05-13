import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user'
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'John',
        description: 'The first name of the user'
    })
    @Column()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user'
    })
    @Column()
    lastName: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user'
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: 'A short bio about the user',
        description: 'The biography of the user',
        nullable: true
    })
    @Column({ nullable: true })
    bio: string;

    @ApiProperty({
        example: '1990-01-01',
        description: 'The date of birth of the user'
    })
    @Column({ nullable: true })
    bod: Date;

    @ApiProperty({
        example: true,
        description: 'Whether the user account is active',
        default: true
    })
    @Column({ default: true })
    isActive: boolean;

    @ApiProperty({
        example: 'hashedPassword123',
        description: 'The hashed password of the user'
    })
    @Column()
    password: string;

    @ApiProperty({
        example: '2023-01-01T00:00:00Z',
        description: 'The timestamp when the user was created'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty({
        example: '2023-01-01T00:00:00Z',
        description: 'The timestamp when the user was last updated'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    async comparePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.password);
    }
}