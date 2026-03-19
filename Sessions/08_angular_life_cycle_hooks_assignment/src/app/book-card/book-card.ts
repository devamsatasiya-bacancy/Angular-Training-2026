import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCardComponent {
  @Input() book: Book = { title: '', author: '', year: 0, description: '', image: '' };
  @Input() index: number = 0;
  @Input() isEditing: boolean = false;
  @Output() editClicked = new EventEmitter<number>();
  @Output() deleteClicked = new EventEmitter<number>();

  showMore = signal(false);

  onEdit() {
    this.editClicked.emit(this.index);
  }

  onDelete() {
    this.deleteClicked.emit(this.index);
  }

  toggleMore() {
    this.showMore.set(!this.showMore());
  }
}
