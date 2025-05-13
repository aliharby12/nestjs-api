import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGIX, REGIX_MESSAGE } from '../user.utils';

@Entity()
export class LoginUserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user'
    })
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'The password for the user account'
    })
    @Column()
    @IsNotEmpty()
    @Matches(REGIX.passwordRegex, { message: REGIX_MESSAGE.passwordRegexMessage })
    @Length(8, 20)
    password: string;
}

export class UserLoginResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'The JWT access token for the user'
    })
    access_token: string;
}
