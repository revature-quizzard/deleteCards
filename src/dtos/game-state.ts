export class GameState {

    id: string;
    name: string;
    category: string;
    capacity: number;
    players: string[];

    constructor(id: string, name: string, category: string, capacity: number, players: string[]) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.capacity = capacity;
        this.players = players;      
    }

}