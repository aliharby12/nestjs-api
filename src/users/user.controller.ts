import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";


@Controller("users")
export class UserController {
    @Post()
    create(@Req() request: Request): string {
        return 'Create a new user';
    }

    @Get()
    find(@Req() request: Request): string[] {
        return ['get all users'];
    };

    @Get('/:id')
    findOne(@Req() request: Request): object {
        return {
            requestParams: request.params.id,
            requestBody: request.body,
            requestHeaders: request.headers
        };
    }

    @Patch('/:id')
    update(@Req() request: Request): object {
        return {
            id: 1,
            name: 'John Doe UPDATED',
        };
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    remove(@Req() request: Request): string {
        return 'Remove a user';
    }
}