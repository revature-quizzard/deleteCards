import { Collections } from "../dtos/collection";
import {Principal} from "../dtos/principal";
import { User } from "../dtos/user";
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


export const getSavedCollections = async (ID : string , token : string) => {

    let resp = await fetch(`${env.apiUrl}/users/${ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    let user: User | null = await resp.json();
    let coll: [] | undefined = user?.collections;

    return coll;
}

export const getFavorites = async (ID : string , token : string) => {

    let resp = await fetch(`${env.apiUrl}/users/${ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    let user: User | null = await resp.json();
    let fav: [] | undefined = user?.favorites;
    console.log(fav);

    return fav;
}

export const favorite = async(user_id: string, collection_id : string, token : string) => {
    let resp = await fetch(`${env.apiUrl}/users/favorites?user_id=${user_id}&collection_id=${collection_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
    });

    if (resp.status > 299) {
        throw await resp.json();
    }
}

export const unfavorite = async(user_id: string, collection_id : string, token : string) => {
    let resp = await fetch(`${env.apiUrl}/users/favorites?user_id=${user_id}&collection_id=${collection_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        
    });

    if (resp.status > 299) {
        throw await resp.json();
    }
}