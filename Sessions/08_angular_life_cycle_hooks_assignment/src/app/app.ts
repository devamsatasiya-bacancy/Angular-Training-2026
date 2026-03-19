import { Component } from '@angular/core';
import { BookListingComponent } from './book-listing/book-listing';

@Component({
  selector: 'app-root',
  imports: [BookListingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
