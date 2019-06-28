import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'jd@example.com',
            password: 'password',
        },
    ];

    getUsers(): Array<any> {
        return this.users;
    }

    getUserById(id: number): any {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserByEmail(email: string): any {
        return this.users.filter(user => user.email === email)[0];
    }
}