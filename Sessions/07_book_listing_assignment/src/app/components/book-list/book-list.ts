import { Component, input } from '@angular/core';
import { Book } from '../book/book';
import { BookModel } from '../book-form/book-form';

@Component({
  selector: 'app-book-list',
  imports: [Book],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  bookListData = input<BookModel []>();
  
  handleNotification(message:string){
    //console.log("first")
    alert(`Alert: ${message}`);
  }
}
