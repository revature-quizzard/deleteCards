import { Timestamp } from "firebase/firestore";

export class Player {
    answered: boolean;
    answered_at: Timestamp;
    name: string;
    player_id : string;
    points : number;

    constructor(answered: boolean, answered_at: Timestamp, name: string, player_id : string, points : number) {
        this.answered = answered;
        this.answered_at = answered_at;
        this.name = name;
        this.player_id = player_id;
        this.points = points;
    }
}