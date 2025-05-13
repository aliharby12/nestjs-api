import { Body, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(@Body() createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hashedPassword;

        const newUser = this.usersRepository.create(createUserDto);
        const res = await this.usersRepository.save(newUser);
        return res;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ email });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
