import { Component, signal } from '@angular/core';
import { SocialMediaFeed } from './components/social-media-feed/social-media-feed';

@Component({
  selector: 'app-root',
  imports: [ SocialMediaFeed],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('13-understanding-observables');
}
