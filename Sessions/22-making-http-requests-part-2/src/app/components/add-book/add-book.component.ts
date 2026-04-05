import { Component, inject, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, timeout, retry, throwError } from 'rxjs';
import { BookService } from '../../services/book.service';
import { ErrorService } from '../../services/error.service';
import { Book, UploadProgress } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBookComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private errorService = inject(ErrorService);
  private router = inject(Router);

  bookForm!: FormGroup;
  
  selectedFile = signal<File | null>(null);
  filePreviewUrl = signal<string | null>(null);
  uploadProgress = signal<UploadProgress | null>(null);
  isUploading = signal(false);
  uploadSuccess = signal(false);
  formError = signal<string | null>(null);

  categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography'];

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      file: [null]
    });
  }

  get title() {
    return this.bookForm.get('title');
  }

  get category() {
    return this.bookForm.get('category');
  }

  get price() {
    return this.bookForm.get('price');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        this.formError.set('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.');
        this.selectedFile.set(null);
        this.filePreviewUrl.set(null);
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.formError.set('File size exceeds 5MB limit.');
        this.selectedFile.set(null);
        this.filePreviewUrl.set(null);
        return;
      }

      this.selectedFile.set(file);
      this.formError.set(null);

      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        this.filePreviewUrl.set(previewUrl);
      } else {
        this.filePreviewUrl.set(null);
      }
    }
  }

  removeFile(): void {
    if (this.filePreviewUrl()) {
      URL.revokeObjectURL(this.filePreviewUrl()!);
    }
    this.selectedFile.set(null);
    this.filePreviewUrl.set(null);
    this.bookForm.patchValue({ file: null });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.formError.set('Please fill in all required fields correctly.');
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);
    this.uploadSuccess.set(false);
    this.formError.set(null);
    this.uploadProgress.set(null);

    const bookData: Book = {
      title: this.bookForm.value.title,
      category: this.bookForm.value.category,
      price: this.bookForm.value.price,
      fileName: this.selectedFile()?.name || undefined,
      fileUrl: this.filePreviewUrl() || undefined,
      createdAt: new Date()
    };

    this.bookService.addBook(bookData).pipe(
      timeout(30000),
      retry({
        count: 3,
        delay: 1000
      }),
      catchError(err => {
        this.isUploading.set(false);
        
        let errorMessage = 'Failed to add book';
        
        if (err.name === 'TimeoutError') {
          errorMessage = 'Request timed out. The server took too long to respond.';
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        this.formError.set(errorMessage);
        this.errorService.setError(errorMessage);
        
        return throwError(() => err);
      })
    ).subscribe({
      next: (response) => {
        console.log('✓ Book added successfully:', response);
        
        this.isUploading.set(false);
        this.uploadSuccess.set(true);
        
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 2000);
      },
      error: (err) => {
        console.error('✗ Failed to add book:', err);
      }
    });
  }

  resetForm(): void {
    this.bookForm.reset();
    this.removeFile();
    this.formError.set(null);
    this.uploadSuccess.set(false);
  }

  ngOnDestroy(): void {
    if (this.filePreviewUrl()) {
      URL.revokeObjectURL(this.filePreviewUrl()!);
    }
  }
}
