import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookQueryParams } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = environment.firebaseUrl;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  getBooks(queryParams?: BookQueryParams): Observable<{ [key: string]: Book }> {
    let params = new HttpParams();
    
    if (queryParams?.search) {
      params = params.set('orderBy', '"title"');
      params = params.set('startAt', `"${queryParams.search}"`);
      params = params.set('endAt', `"${queryParams.search}\uf8ff"`);
    }
    
    if (queryParams?.category) {
      params = params.set('orderBy', '"category"');
      params = params.set('equalTo', `"${queryParams.category}"`);
    }

    return this.http.get<{ [key: string]: Book }>(this.apiUrl, {
      headers: this.getHeaders(),
      params
    });
  }

  addBook(book: Book): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.apiUrl, book, {
      headers: this.getHeaders()
    });
  }

  getBookById(id: string): Observable<Book> {
    const url = `${this.apiUrl.replace('.json', '')}/${id}.json`;
    return this.http.get<Book>(url, {
      headers: this.getHeaders()
    });
  }
}
