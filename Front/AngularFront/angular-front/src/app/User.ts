export class User {
    id!: number;
    name!: string;
    username!: string;
    password!: string;
    email!: string;
    phoneNumber!: string;

    // constructor (login: string, password: string) {
        
    // }

    constructor (username: string, password: string, name?: string, email?: string, phoneNumber?: string) {
        this.username = username;
        this.password = password;
        if (name && email && phoneNumber) {
            this.name = name;
            this.email = email;
            this.phoneNumber = phoneNumber
        }
    }
}