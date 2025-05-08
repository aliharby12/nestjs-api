import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { createUserDTO } from "./dto/create.dto";
import { updateUserDTO } from "./dto/update.dto";


@Controller("users")
export class UserController {
    @Post()
    create(@Req() request: Request, @Body() body: createUserDTO): object {
        return body;
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
    update(@Req() request: Request, @Body() body: updateUserDTO): object {
        return body;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    remove(@Req() request: Request): string {
        return 'Remove a user';
    }
}