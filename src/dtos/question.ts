export class Question {

    id: string;
    collection_id: string;
    question: string; 
    answer: string;
    category: string;
    value: string;
   

    constructor(id: string, collection_id: string, qw: string, ans: string, cat: string, val: string) {
        this.id = id;
        this.collection_id = collection_id;
        this.question = qw;
        this.answer = ans;
        this.category = cat;
        this.value = val;
    }

}