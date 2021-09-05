export class GameState {

    match_id: string;
    player1: string;
    player2: string;
   



    constructor(mid: string, plyr1: string , plyr2: string ) {
        
        this.match_id = mid;
        this.player1 = plyr1;
        this.player2 = plyr2
    }

}