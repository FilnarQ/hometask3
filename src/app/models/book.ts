export type BookDetails = {
    id:number;
    title:string;
    cover:string;
    content:string;
    author:string;
    genre:string;
    rating:number;
    reviews:[{
        id:number;
        message:string;
        reviewer:string;
    }];
}
export type Book = {
    id:number;
    title:string;
    cover:string;
    author:string;
    rating:number;
    reviewsNumber:number;
}

export type EditBook = {
    id?:number;
    title:string;
    cover:string;
    author:string;
    genre:string;
    content:string;
}