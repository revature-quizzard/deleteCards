import { Timestamp } from "firebase/firestore";

export class Player {
    answered: boolean;
    answered_at: Timestamp;
    answered_correctly: boolean;
    placing: number;
    name: string | undefined;
    points : number;
    id : string;
    icon : string | undefined;

    constructor(answered: boolean, answered_at: Timestamp, answered_correctly: boolean, placing: number, name: string, player_id : string, points : number, id : string, icon : string | undefined) {
        this.answered = answered;
        this.answered_at = answered_at;
        this.answered_correctly = answered_correctly,
        this.placing = placing,
        this.name = name;
        this.points = points;
        this.id = id;
        this.icon = icon;
    }
}