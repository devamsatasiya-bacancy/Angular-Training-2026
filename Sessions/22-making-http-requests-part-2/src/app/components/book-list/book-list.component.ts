import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookService } from '../../services/book.service';
import { ErrorService } from '../../services/error.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  private errorService = inject(ErrorService);

  books = signal<Book[]>([]);
  localError = signal<string | null>(null);

  searchControl = new FormControl('', { nonNullable: true });
  categoryControl = new FormControl('', { nonNullable: true });
  minPriceControl = new FormControl<number | null>(null);
  maxPriceControl = new FormControl<number | null>(null);

  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography'];

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe(search => this.fetchBooks(search));

    this.categoryControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe(() => this.fetchBooks());
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.fetchBooks();
  }

  private fetchBooks(search?: string): void {
    const queryParams = {
      search: search || this.searchControl.value || undefined,
      category: this.categoryControl.value || undefined,
      minPrice: this.minPriceControl.value || undefined,
      maxPrice: this.maxPriceControl.value || undefined
    };

    this.bookService.getBooks(queryParams).pipe(
      catchError(err => {
        this.localError.set(err.message || 'Failed to load books');
        this.errorService.setError(err.message || 'Failed to load books');
        this.books.set([]);
        return of({});
      })
    ).subscribe(data => {
      if (data) {
        const booksArray = Object.entries(data).map(([id, book]) => ({
          ...book,
          id
        }));
        
        let filteredBooks = booksArray;
        
        if (this.minPriceControl.value !== null) {
          filteredBooks = filteredBooks.filter(book => book.price >= this.minPriceControl.value!);
        }
        
        if (this.maxPriceControl.value !== null) {
          filteredBooks = filteredBooks.filter(book => book.price <= this.maxPriceControl.value!);
        }
        
        this.books.set(filteredBooks);
        this.localError.set(null);
      }
    });
  }

  applyPriceFilter(): void {
    this.fetchBooks();
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.categoryControl.setValue('');
    this.minPriceControl.setValue(null);
    this.maxPriceControl.setValue(null);
    this.loadBooks();
  }

  clearError(): void {
    this.localError.set(null);
    this.errorService.clearError();
  }
}
