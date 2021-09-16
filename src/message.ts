import { Timestamp } from "firebase/firestore";

export class Message {
    createdAt: Timestamp;
    text: string;
    uid: string;

    constructor(createdAt: Timestamp, text: string, uid: string) {
        this.createdAt = createdAt;
        this.text = text;
        this.uid = uid;
    }
}