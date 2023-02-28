import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book, BookDetails, EditBook } from '../models/book';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl:string = "https://localhost:5001"
  getBook(id:number) : Observable<BookDetails>
  {
    return this.http.get<BookDetails>(`${this.baseUrl}/api/books/${id}`);
  }

  getBooks() : Observable<Book[]>
  {
    return this.http.get<Book[]>(`${this.baseUrl}/api/books/`);
  }

  getRecommended() : Observable<Book[]>
  {
    return this.http.get<Book[]>(`${this.baseUrl}/api/recommended/`);
  }

  postBook(book:EditBook) : Observable<number>
  {
    return this.http.post<number>(`${this.baseUrl}/api/books/save`, {...book});
  }

  putReview(review:Review, id:number) : Observable<number>
  {
     return this.http.put<number>(`${this.baseUrl}/api/books/${id}/review`, {...review});
  }

  putRating(rating:number, id:number) : Observable<number>
  {
     return this.http.put<number>(`${this.baseUrl}/api/books/${id}/rate`, {score:rating});
  }

  constructor(private http: HttpClient) { }
}
