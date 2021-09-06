export class Question {

    id: string;
    question: string; 
    answer: string;
    category: string;
    value: string;
   

    constructor(id: string, qw: string, ans: string, cat: string, val: string) {
        this.id = id;
        this.question = qw;
        this.answer = ans;
        this.category = cat;
        this.value = val;
    }

}