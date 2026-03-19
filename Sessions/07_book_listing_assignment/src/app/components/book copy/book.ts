import { Component, Input, input, Output, output } from '@angular/core';
import { BookModel } from '../book-form/book-form';

@Component({
  selector: 'app-look',
  imports: [],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Look {
 
  title = input<string>();
  
}
