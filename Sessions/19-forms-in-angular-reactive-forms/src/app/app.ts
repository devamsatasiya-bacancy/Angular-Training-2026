import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactUsForm } from "./components/contact-us-form/contact-us-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContactUsForm],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('19-forms-in-angular-reactive-forms');
}
