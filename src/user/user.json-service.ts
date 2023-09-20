import { User } from './user';
import { UserService } from './user.service';
import * as fs from 'fs';

export class UserJSONService implements UserService {
    private users: User[] = [];

    constructor() {
        const rawData = fs.readFileSync('src/user/user.json', 'utf-8');
        this.users = JSON.parse(rawData);
    }

    add(username: string): User {
        const newUser: User = {
            id: this.users.length + 1,
            username,
        };
        this.users.push(newUser);
        return newUser;
    }

    getById(id: number): User | null {
        const user = this.users.find((u) => u.id === id);
        return user || null;
    }
}
