import { Timestamp } from "firebase/firestore";
import { Collections } from "./collection";
import { Player } from "./player";

export class GameState {

    id: string;
    name: string;
    capacity: number;
    match_state: number;
    question_index: number;
    question_timer: number;
    start_time: Timestamp;
    end_time: Timestamp;
    host: string;
    players: Player[] = [];
    collection: Collections;

    constructor(id: string, name: string, capacity: number, match_state: number, question_index: number, question_timer: number,
                                                start_time: Timestamp, end_time: Timestamp, host: string, players: Player[], collection: Collections) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.match_state = match_state;
        this.question_index = question_index;
        this.question_timer = question_timer;
        this.start_time = start_time;
        this.end_time = end_time;
        this.host = host;
        // this.players = players;
        this.collection = collection;
    }

}