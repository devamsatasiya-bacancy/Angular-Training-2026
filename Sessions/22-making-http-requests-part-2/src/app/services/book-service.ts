import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { devEnvironment } from '../../ng-environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = devEnvironment.firebaseUrl;

  getBooks(): Observable<{ [key: string]: Book }> {
    /*     
  let params = new HttpParams();
    
    if (queryParams?.search) {
      params = params.set('orderBy', 'title');
      params = params.set('startAt', `"${queryParams.search}"`);
      params = params.set('endAt', `"${queryParams.search}\uf8ff"`);
    }
    
    if (queryParams?.category) {
      params = params.set('orderBy', '"category"');
      params = params.set('equalTo', `"${queryParams.category}"`);
    } */

    return this.http.get<{ [key: string]: Book }>(this.apiUrl, {
      //params
    });
  }

  addBook(book: Book): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.apiUrl, book);
  }

  getBookById(id: string): Observable<Book> {
    const url = `${this.apiUrl.replace('.json', '')}/${id}.json`;
    return this.http.get<Book>(url, {});
  }
}
