import { Component, Input, input, output } from '@angular/core';
import { BookModel } from '../book-form/book-form';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book {
 
  bookData = input<BookModel>();
  notify = output<string>();


  sendNotification(){
    
    let title = this.bookData()?.title;
    if (title) {
      this.notify.emit(title);
    }
  }
}
