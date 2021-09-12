import { Collections } from '../dtos/collection.js';
import env from '../util/env.js';

export const createCollection = async (collection : Collections | undefined, token : string) => {
    let resp = await fetch(`${env.apiUrl}/collections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(collection)
    });

    console.log(resp.status)
    if (resp.status > 299) {
        throw await resp.json();
    }

    collection = await resp.json();
    return collection

}

export const getAllCollections = async (collection: {collectionTitle: string , collectionDescription: string , collectionCategory: string , collectionAuthor: string}) => {
    let resp = await fetch(`${env.apiUrl}/collections`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}

export const getCollection = async (collection_id : string, token : string) => {
    let resp = await fetch(`${env.apiUrl}/collections/${collection_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    let collection: Collections = await resp.json();
    return collection

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