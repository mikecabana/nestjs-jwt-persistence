import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUserCredentials } from './models/i-user-credentials.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async createToken(@Body() credentials: IUserCredentials): Promise<any> {
        return await this.authService.createToken(credentials);
    }
}
