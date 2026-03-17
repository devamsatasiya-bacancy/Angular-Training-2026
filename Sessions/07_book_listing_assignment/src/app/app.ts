import { Component, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookForm } from './components/book-form/book-form';
import { BookList } from './components/book-list/book-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , BookForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  //data = outpu()
  protected readonly title = signal('07_book_listing_assignment');
}
