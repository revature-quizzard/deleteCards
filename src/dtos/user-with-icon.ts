export class UserWithIcon {

    id: string;
    username: string;
    icon: string | undefined;
    token: string;

    constructor(id: string, un: string, icon: string | undefined, token: string) {
        this.id = id;
        this.username = un;
        this.icon = icon;
        this.token = token;
    }

}