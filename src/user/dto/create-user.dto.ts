import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { REGIX, REGIX_MESSAGE } from '../user.utils';

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    dob: Date;
    bio: string;

    @IsNotEmpty()
    @Matches(REGIX.passwordRegex, { message: REGIX_MESSAGE.passwordRegexMessage })
    @Length(8, 20)
    password: string;

    @IsNotEmpty()
    @Matches(REGIX.passwordRegex, { message: REGIX_MESSAGE.passwordRegexMessage })
    @Length(8, 20)
    confirmPassword: string;
}
