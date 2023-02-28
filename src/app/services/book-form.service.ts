import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookFormService {

  private id:Subject<number> = new Subject<number>;

  idChanged$:Observable<number> = this.id.asObservable();
  
  constructor() { }

  editBook(bookId:number)
  {
    this.id.next(bookId);
  }
  cancelEditing()
  {
    this.id.next(0);
  }
}
