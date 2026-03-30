import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Body } from './body/body';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Body],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('06_quiz_application_assignment');
}
