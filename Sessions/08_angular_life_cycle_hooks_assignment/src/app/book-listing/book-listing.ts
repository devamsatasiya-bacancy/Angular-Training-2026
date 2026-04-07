import { Component, signal, ViewChild, computed, ElementRef } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card';
import { BookFormComponent } from '../book-form/book-form';
import { ToastComponent } from '../toast/toast';
import { Book } from '../book.model';

declare const bootstrap: any;

const DEFAULT_IMAGE =
  'https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg';

@Component({
  selector: 'app-book-listing',
  imports: [BookCardComponent, BookFormComponent, ToastComponent],
  templateUrl: './book-listing.html',
  styleUrl: './book-listing.scss',
})
export class BookListingComponent {
  @ViewChild('bookFormComponent') bookForm!: BookFormComponent;
  @ViewChild('bookModal') bookModalElement!: ElementRef;
  private bookModal: any;

  bookList: Book[] = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 1925,
      description: 'A novel set in the Jazz Age on Long Island.',
      image: DEFAULT_IMAGE,
    },
    {
      title: '1984',
      author: 'George Orwell',
      price: 1949,
      description: 'A dystopian social science fiction novel.',
      image: DEFAULT_IMAGE,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 1960,
      description: 'A novel about racial injustice and moral growth in the American South.',
      image: DEFAULT_IMAGE,
    },
  ];

  currentBookIndex = signal<number | null>(null);
  toastMessage = signal<string>('');

  selectedBook = computed(() => {
    const idx = this.currentBookIndex();
    return idx !== null ? this.bookList[idx] : null;
  });

  modalTitle = computed(() => {
    return this.currentBookIndex() !== null ? 'Edit Book' : 'Add Book';
  });

  ngAfterViewInit() {
    this.bookModal = new bootstrap.Modal(this.bookModalElement.nativeElement);
    
    // Listen for modal hidden event to reset state
    this.bookModalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.onModalClose();
    });
  }

  onModalClose() {
    this.currentBookIndex.set(null);
    this.bookForm.clearForm();
  }

  onEditBook(index: number) {
    this.currentBookIndex.set(index);
    this.bookModal.show();
  }

  onDeleteBook(index: number) {
    this.bookList = this.bookList.filter((_, i) => i !== index);
    if (this.currentBookIndex() === index) {
      this.currentBookIndex.set(null);
      this.bookModal.hide();
      this.bookForm.clearForm();
    }
    this.showToast('Book deleted successfully!');
  }

  onAddBook() {
    this.currentBookIndex.set(null);
    this.bookForm.clearForm();
    this.bookModal.show();
  }

  onSave() {
    const formValue = this.bookForm.getFormValue();
    const idx = this.currentBookIndex();
    if (idx !== null) {
      this.bookList[idx] = { ...formValue, image: DEFAULT_IMAGE };
      this.showToast('Book updated successfully!');
    } else {
      this.bookList = [...this.bookList, { ...formValue, image: DEFAULT_IMAGE }];
      this.showToast('Book added successfully!');
    }
    this.currentBookIndex.set(null);
    this.bookModal.hide();
    this.bookForm.clearForm();
  }

  private showToast(message: string) {
    this.toastMessage.set('');
    this.toastMessage.set(message);
  }
}
