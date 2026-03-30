import { Component, signal } from '@angular/core';
import { ContactUsForm } from "./components/contact-us-form/contact-us-form";

@Component({
  selector: 'app-root',
  imports: [ ContactUsForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('18-forms-in-angular-template-drivenn');
}
