import {Principal} from "../dtos/principal";
import env from '../util/env.js';

export const registration = async (user: {username: string, password: string , firstName: string , lastName: string ,  email: string }) => {
    let resp = await fetch(`${env.apiUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    let token: string | null = resp.headers.get('Authorization');

    let principal: Principal = await resp.json();
    if (token && principal) principal.token = token;

    console.log(principal)
    return principal;
}