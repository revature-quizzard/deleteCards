import {Principal} from "../dtos/principal";
import env from '../util/env.js';

export const authenticate = async (credentials: {username: string, password: string}) => {
    let resp = await fetch(`${env.apiUrl}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    let token: string | null = resp.headers.get('Authorization');
    console.log(token);
    let principal: Principal = await resp.json();
    if (token && principal) principal.token = token;

    console.log(principal)
    return principal;
}