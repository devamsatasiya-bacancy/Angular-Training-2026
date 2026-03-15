import { Component } from '@angular/core';
import { QuizBody } from '../components/quiz-body/quiz-body';

@Component({
  selector: 'app-body',
  imports: [QuizBody],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {}
