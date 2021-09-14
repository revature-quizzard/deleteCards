import { Timestamp } from "firebase/firestore";

export class GameState {

    id: string;
    name: string;
    capacity: number;
    match_state: number;
    question_index: number;
    question_timer: number;
    start_time: Timestamp;
    end_time: Timestamp;
    players: string[];
    questions: string[];

    constructor(id: string, name: string, capacity: number, match_state: number, question_index: number, question_timer: number,
                                                            start_time: Timestamp, end_time: Timestamp, players: string[], questions: string[]) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.match_state = match_state;
        this.question_index = question_index;
        this.question_timer = question_timer;
        this.start_time = start_time;
        this.end_time = end_time;
        this.players = players;
        this.questions = questions;
    }

}