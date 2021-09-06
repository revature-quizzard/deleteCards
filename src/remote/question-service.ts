import env from '../util/env.js';

export const createQuestion = async (question: { question: string , answer: string , category: string , value: string }) => {
    let resp = await fetch(`${env.apiUrl}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}