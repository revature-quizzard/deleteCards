import { Timestamp } from "firebase/firestore";

export class Player {
    answered: boolean;
    answered_at: Timestamp;
    name: string | undefined;
    points : number;
    id : string;

    constructor(answered: boolean, answered_at: Timestamp, name: string, player_id : string, points : number, id : string) {
        this.answered = answered;
        this.answered_at = answered_at;
        this.name = name;
        this.points = points;
        this.id = id;
    }
}