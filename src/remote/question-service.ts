import { Question } from '../dtos/question.js';
import env from '../util/env.js';

export const createQuestion = async (question: Question, token: string) => {
    console.log(question)
    let resp = await fetch(`${env.apiUrl}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(question)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

    question = await resp.json();
    return question
}

export const editQuestion = async (question: Question, token: string) => {
    let resp = await fetch(`${env.apiUrl}/questions`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(question)
    });

    if (resp.status > 299) {
        throw await resp.json();
    }

}

export const deleteQuestion = async (question_id: String, token: String) => {
    let resp = await fetch(`${env.apiUrl}/questions/${question_id}`, {
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