import { Component, signal, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookList } from '../book-list/book-list';

export interface BookModel {
  id : number,
  title :string,
  description:string,
  author:string, 
  price:number
}

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule , BookList],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})

export class BookForm {


  public booksList  = signal<BookModel[]>([]);
  public bookForm : FormGroup ;

  constructor(){
    this.bookForm = new FormGroup (
      {
        title : new FormControl(null , Validators.required),
        description: new FormControl(null , Validators.required),
        author: new FormControl(null , Validators.required),
        price : new FormControl(null , [Validators.required ,Validators.min(1) , Validators.max(1000)])

      }
    );
  }

  onSubmit(){
    if (this.bookForm.valid) {
      

      console.log(this.bookForm.value);
      let book:BookModel = {
        id : this.booksList.length +1,
        title: this.bookForm.controls['title'].value,
        author: this.bookForm.controls['author'].value,
        price: this.bookForm.controls['price'].value,
        description: this.bookForm.controls['description'].value,
      }
    this.booksList.update(books => [...books , book]);

    this.bookForm.reset();
    }
  }


}
