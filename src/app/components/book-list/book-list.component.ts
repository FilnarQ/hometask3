import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, Observable, Subscription, timeInterval } from 'rxjs';
import { Book, BookDetails } from 'src/app/models/book';
import { BookFormService } from 'src/app/services/book-form.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  books$: Observable<Book[]> = new Observable;
  recommended$: Observable<Book[]> = new Observable;
  update: Subscription;

  constructor ( private booksService: BooksService, private bookFormService: BookFormService){
    this.update = bookFormService.idChanged$.subscribe(()=>
    {
      setTimeout(()=>{
        this.books$ = booksService.getBooks();
      },500)
    })
  }

  tracker(i:number, item:any){return i}
  ngOnInit()
  {
    this.books$ = this.booksService.getBooks();
    this.recommended$ = this.booksService.getRecommended();
  }
  ngOnDestroy()
  {
    this.update.unsubscribe()
  }
}
