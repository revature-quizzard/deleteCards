import { GameState } from "../dtos/game-state";
import env from '../util/env.js';
//structure for game generation inteeface mid: string, plyr1: string , plyr2: string 
export const generate_game = async (Game: { plyr1: string, plyr2: string }) => {
//                                        questions is the dummy endpoint for now
    let resp = await fetch(`${env.apiUrl}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Game)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

   // let token: string | null = resp.headers.get('Authorization');

    let gameState: GameState = await resp.json();
    //if (token && gameState) principal.token = token;

    console.log(gameState)
    return gameState;
}