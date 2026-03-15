import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './body/body';
Footer
@Component({
  selector: 'app-root',
  imports: [RouterOutlet , Header, Footer, Body ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('06_quiz_application_assignment');
}
