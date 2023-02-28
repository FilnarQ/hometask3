import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, BookDetails } from 'src/app/models/book';
import { BookFormService } from 'src/app/services/book-form.service';
import { BooksService } from 'src/app/services/books.service';
import { BookDetailsDialogComponent } from '../book-details-dialog/book-details-dialog.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent {
  @Input()
  book:Book = {
    id: 0,
    title:"NO TITLE",
    cover:"NO COVER",
    author:"NO AUTHOR",
    rating: 0,
    reviewsNumber: 0
  };

  constructor(private bookFormService:BookFormService, private booksService:BooksService, private dialog: MatDialog){}
  edit()
  {
    this.bookFormService.editBook(this.book.id);
  }
  view()
  {
    let bookDetails:BookDetails;
    this.booksService.getBook(this.book.id).subscribe(next=>{
      bookDetails=next;
      this.dialog.open(BookDetailsDialogComponent, {data:bookDetails});
    })
  }
}
