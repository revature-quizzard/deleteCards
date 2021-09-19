import { Timestamp } from "firebase/firestore";

export class Player {
    answered: boolean;
    answered_at: Timestamp;
    answered_correctly: boolean;
    placing: number;
    name: string | undefined;
    points : number;
    streak : number;
    id : string;

    constructor(answered: boolean, answered_at: Timestamp, answered_correctly: boolean, placing: number, name: string, player_id : string, points : number, streak : number ,  id : string) {
        this.answered = answered;
        this.answered_at = answered_at;
        this.answered_correctly = answered_correctly,
        this.placing = placing,
        this.name = name;
        this.points = points;
        this.streak = streak;;
        this.id = id;
    }
}