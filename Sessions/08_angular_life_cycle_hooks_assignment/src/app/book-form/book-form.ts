import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookFormComponent implements OnChanges {
  @Input() bookData: Book | null = null;

  title: string = '';
  author: string = '';
  price: number | null = null;
  description: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookData'] && this.bookData) {
      this.title = this.bookData.title;
      this.author = this.bookData.author;
      this.price = this.bookData.price;
      this.description = this.bookData.description;
    }
  }

  clearForm() {
    this.title = '';
    this.author = '';
    this.price = null;
    this.description = '';
  }

  getFormValue(): Omit<Book, 'image'>  {
    return {
      title: this.title,
      author: this.author,
      price: this.price ?? 0,
      description: this.description,
    };
  }
}
