import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './models/i-jwt-payload.interface';
import { SignOptions } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { IUserCredentials } from './models/i-user-credentials.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async createToken(credentials: IUserCredentials) {

        const options: SignOptions = {
            expiresIn: '10m',
        };

        const user = await this.validateUser({ email: credentials.email });

        if (user.password !== credentials.password) {
            return UnauthorizedException;
        }

        const payload: IJwtPayload = { email: credentials.email };
        const accessToken = this.jwtService.sign(payload, options);

        return {
            expiresIn: options.expiresIn,
            accessToken,
            refreshToken: await this.createRefreshToken(credentials, payload, options),
        };
    }

    async createRefreshToken(credentials: IUserCredentials, payload: IJwtPayload, options: SignOptions): Promise<string> {
        const refreshPayload: any = { isRefreshToken: true, ...payload };
        const refreshOptions: SignOptions = Object.assign(options, { expiresIn: '7d' });

        if (credentials.rememberMe) {
            return this.jwtService.sign(refreshPayload, refreshOptions);
        } else {
            return this.jwtService.sign(refreshPayload, options);
        }
    }

    async validateUser(payload: IJwtPayload): Promise<any> {
        const { email } = payload;

        const user = this.usersService.getUserByEmail(email);

        if (!user) {
            return UnauthorizedException;
        }
        return user;
    }
}
