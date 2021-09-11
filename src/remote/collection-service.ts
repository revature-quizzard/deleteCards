import env from '../util/env.js';
import { Collections } from "../dtos/collection";

export const createCollection = async (colleciton: {collectionTitle: string , collectionDescription: string , collectionCategory: string , collectionAuthor: string}) => {
    let resp = await fetch(`${env.apiUrl}/collections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colleciton)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}

export const getCollection = async (collection: {collectionTitle: string , collectionDescription: string , collectionCategory: string , collectionAuthor: string}) => {
    let resp = await fetch(`${env.apiUrl}/collections`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(collection)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}

export const editCollection = async (collection: Collections, token: string) => {
    let resp = await fetch(`${env.apiUrl}/collections`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(collection)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}

export const deleteCollection = async (collection_id: String, token: String) => {
    let resp = await fetch(`${env.apiUrl}/collections/${collection_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });

    if (resp.status > 299) {
        throw await resp.json();
    }
}