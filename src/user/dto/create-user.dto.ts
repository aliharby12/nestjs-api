import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGIX, REGIX_MESSAGE } from '../user.utils';

@Entity()
export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user'
    })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'John',
        description: 'The first name of the user'
    })
    @Column()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user'
    })
    @Column()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: '1990-01-01',
        description: 'The date of birth of the user',
        nullable: true
    })
    @Column({ nullable: true })
    dob: Date;

    @ApiProperty({
        example: 'A short bio about the user',
        description: 'The biography of the user',
        nullable: true
    })
    @Column({ nullable: true })
    bio: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'The password for the user account'
    })
    @Column()
    @IsNotEmpty()
    @Matches(REGIX.passwordRegex, { message: REGIX_MESSAGE.passwordRegexMessage })
    @Length(8, 20)
    password: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Password confirmation that must match password'
    })
    @IsNotEmpty()
    @Matches(REGIX.passwordRegex, { message: REGIX_MESSAGE.passwordRegexMessage })
    @Length(8, 20)
    confirmPassword: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
