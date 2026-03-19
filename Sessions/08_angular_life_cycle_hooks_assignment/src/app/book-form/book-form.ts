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
  year: number | null = null;
  description: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookData'] && this.bookData) {
      this.title = this.bookData.title;
      this.author = this.bookData.author;
      this.year = this.bookData.year;
      this.description = this.bookData.description;
    }
  }

  clearForm() {
    this.title = '';
    this.author = '';
    this.year = null;
    this.description = '';
  }

  getFormValue(): Omit<Book, 'image'> {
    return {
      title: this.title,
      author: this.author,
      year: this.year ?? 0,
      description: this.description,
    };
  }
}
