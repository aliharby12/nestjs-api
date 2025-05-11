export class Blog { }

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    bio: string;

    @Column()
    bod: Date

    @Column({ default: true })
    isActive: boolean;
}