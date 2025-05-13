import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && (await user.comparePassword(pass))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginUserDto): Promise<{ access_token: string, refresh: string }> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        // Generate JWT token
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    async register(user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }

    async getProfile(userId: number): Promise<Omit<User, 'password'>> {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}