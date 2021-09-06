export class Collection {

    id: string;
    collectionTitle: string; 
    collectionDescription: string;
    collectionCategory: string;
    collectionAuthor: string;
   

    constructor(id: string, ct: string, cd: string, cc: string, ca: string) {
        this.id = id;
        this.collectionTitle = ct;
        this.collectionDescription = cd;
        this.collectionCategory = cc;
        this.collectionAuthor = ca;
    }

}