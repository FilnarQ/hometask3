import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetails } from 'src/app/models/book';
import { Review } from 'src/app/models/review';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.scss']
})
export class BookDetailsDialogComponent {
  review:Review = {
    reviewer:"",
    message:""
  }
  scores = [1,2,3,4,5]
  score = 0;
constructor(@Inject(MAT_DIALOG_DATA) public data: BookDetails, private booksService:BooksService) {}

  active(num:number)
  {
    if(num<this.score)
    {
      return "yellow"
    }
    else
    {
      return ""
    }
  }
  sendScore(score:number)
  {
    this.score = score;
    this.booksService.putRating(score, this.data.id).subscribe();
  }
  sendReview()
  {
    this.booksService.putReview(this.review, this.data.id).subscribe();
  }
}
