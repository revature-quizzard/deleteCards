export class User {

    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    collections: [];
    favorites: [];


    constructor(id: string, un: string, pw: string, fn: string, ln: string, email: string) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.collections = [];
        this.favorites = [];
    }

}