import { Collections } from "./collection";

export class GameSettings {

    maxPlayers: Number | undefined;
    matchTimer: Number | undefined;
    collection: Collections | undefined;
    category: string | undefined;
    name: string | undefined;


    constructor(maxPlayers: Number | undefined , matchTimer : Number | undefined , collection : Collections | undefined  , category : string | undefined , name: string | undefined) {
        this.maxPlayers = maxPlayers;
        this.matchTimer = matchTimer;
        this.collection = collection;
        this.category = category;
        this.name = name;
    }

}