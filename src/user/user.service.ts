import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class UserService {
    create() {
        return 'This action adds a new user';
    }
}
