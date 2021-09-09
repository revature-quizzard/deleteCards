import { Principal } from "./principal";

export class Collections {

    id: string;
    title: string; 
    description: string;
    category: string;
    author: Principal;
    questionList: [];

    constructor(id: string, ct: string, cd: string, cc: string, ca: Principal) {
        this.id = id;
        this.title = ct;
        this.description = cd;
        this.category = cc;
        this.author = ca;
        this.questionList = [];
    }

}