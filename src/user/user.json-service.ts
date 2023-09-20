import { User } from './user';
import { UserService } from './user.service';
import * as fs from 'fs';

export class UserJSONService implements UserService {
    private users: User[] = [];
    private filePath: string = 'src/user/user.json'; // Assurez-vous que le chemin du fichier est correct

    constructor() {
        this.loadUsersFromFile();
    }

    private loadUsersFromFile(): void {
        try {
            const rawData = fs.readFileSync(this.filePath, 'utf-8');
            this.users = JSON.parse(rawData);
        } catch (error) {
            console.error("Une erreur s'est produite lors du chargement des utilisateurs depuis le fichier JSON :", error);
        }
    }

    private saveUsersToFile(): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'écriture dans le fichier JSON :", error);
        }
    }

    add(username: string): User {
        const newUser: User = {
            id: this.users.length + 1,
            username,
        };

        this.users.push(newUser);
        this.saveUsersToFile(); // Enregistrez les utilisateurs dans le fichier JSON
        return newUser;
    }

    getById(id: number): User | null {
        const user = this.users.find((u) => u.id === id);
        return user || null;
    }
}
