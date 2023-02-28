import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReplaySubject, Subscription } from 'rxjs';
import { Book, EditBook } from 'src/app/models/book';
import { BookFormService } from 'src/app/services/book-form.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {
  sub:Subscription;
  editing:boolean = false;
  book:EditBook = {
    title:"",
    cover:"",
    genre:"",
    author:"",
    content:""
  }

  constructor(private http: HttpClient, private bookFormService: BookFormService, private booksService: BooksService)
  {
    this.sub = bookFormService.idChanged$.subscribe(next=>
      {
        if (next==0)
        {
          this.editing = false;
        }
        else
        {
          this.editing = true;
          booksService.getBook(next).subscribe({
            next: book=>{
              this.book = book;
            },
            error: (error)=>{
              bookFormService.cancelEditing();
            }
          })
        }
      })
  }
  
  processImg(event:Event)
  {
    const target = event.target as HTMLInputElement;
    const file:File = (target.files as FileList)[0];
    this.convertImg(file)
  }
  convertImg(file:File)
  {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.book.cover = reader.result?.toString()??"";
    }
  }
  onSubmit()
  {
    this.booksService.postBook(this.book).subscribe();
    this.bookFormService.cancelEditing()
  }
  onCancel()
  {
    if (this.editing) this.bookFormService.cancelEditing();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
