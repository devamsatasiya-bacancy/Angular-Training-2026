import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { BookModel } from '../book-form/book-form';
import { Look } from '../book copy/book';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book implements AfterContentInit {
  bookData = input<BookModel>();
  notify = output<string>();
  @ContentChild(Look) parachild!: Look;

  ngAfterContentInit(): void {
    console.log(this.parachild.title());
  }
  sendNotification() {
    let title = this.bookData()?.title;
    if (title) {
      this.notify.emit(title);
    }
  }
}
