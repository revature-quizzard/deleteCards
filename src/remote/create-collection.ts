import env from '../util/env.js';

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