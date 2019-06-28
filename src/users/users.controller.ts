import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    public getUsers() {
        return this.usersService.getUsers();
    }
}
