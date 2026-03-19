import { AfterContentInit, Component, ContentChild, input } from '@angular/core';
import { Book } from '../book/book';
import { BookModel } from '../book-form/book-form';
import { Look } from '../book copy/book';
@Component({
  selector: 'app-book-list',
  imports: [Book, Look],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css', 
})
export class BookList  {


  bookListData = input<BookModel []>();

  handleNotification(message:string){
    //console.log("first")
    alert(`Alert: ${message}`);
  }
}
