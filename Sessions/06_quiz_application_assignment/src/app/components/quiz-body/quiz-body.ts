import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
type GameStatus = 'home' | 'playing' | 'end';
const MAX_QUESTIONS = 5;
const STAR_COUNT = 5;

@Component({
  selector: 'app-quiz-body',
  imports: [FormsModule, NgClass],
  templateUrl: './quiz-body.html',
  styleUrls: ['./quiz-body.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizBody {
  public titledata = input<string>('');
  private correctanswers = [
    'JavaScript',
    'File',
    'Cascading Style Sheets',
    '1995',
    'getElementById(id)',
  ];

  public gameStatus = signal<GameStatus>('home');
  public userAnswers: string[] = new Array(MAX_QUESTIONS).fill('');
  public currentIndex = signal<number>(0);
  public finalScore = signal<number>(0);
  public totalQuestions = computed(() => this.QuizQuestions.length);
  public currentQuestionNumber = computed(() => this.currentIndex() + 1);
  public currentQuestion = computed(() => this.QuizQuestions[this.currentIndex()]);
  public starDisplay = computed(() => {
    const filledStars = this.finalScore();
    const emptyStars = STAR_COUNT - filledStars;
    return `${'★'.repeat(filledStars)}${'☆'.repeat(emptyStars)}`;
  });

  public starTone = computed(() => {
    const ratio = this.finalScore() / this.totalQuestions();
    if (ratio <= 0.4) {
      return 'low';
    }

    if (ratio <= 0.7) {
      return 'medium';
    }

    return 'high';
  });

  public QuizQuestions = [
    {
      id: 1,
      question: 'Which language runs in a web browser?',
      options: ['Python', 'C++', 'JavaScript', 'Java'],
    },
    {
      id: 2,
      question: 'Which of the following is a server-side JavaScript object?',
      options: ['Function', 'File', 'Date', 'RegExp'],
    },
    {
      id: 3,
      question: 'What does CSS stand for?',
      options: [
        'Central Style Sheets',
        'Cascading Style Sheets',
        'Cascading Simple Sheets',
        'Cars SUVs Sailboats',
      ],
    },
    {
      id: 4,
      question: 'What year was JavaScript launched?',
      options: ['1996', '1995', '1994', '2000'],
    },
    {
      id: 5,
      question: 'Which method is used to access an HTML element using JavaScript?',
      options: [
        'selectElement(i)',
        'getElementById(id)',
        'getElementByName(name)',
        'queryElement(i)',
      ],
    },
  ];

  startQuiz() {
    this.restartQuiz();
  }

  private calculateScore() {
    let score = 0;
    for (let index = 0; index < this.correctanswers.length; index++) {
      if (this.correctanswers[index] === this.userAnswers[index]) {
        score++;
      }
    }

    this.finalScore.set(score);
  }

  previousQuestion() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((value) => value - 1);
    }
  }

  nextQuestion() {
    if (this.currentIndex() < this.totalQuestions() - 1) {
      this.currentIndex.update((value) => value + 1);
      return;
    }

    this.calculateScore();
    this.gameStatus.set('end');
  }

  restartQuiz() {
    this.userAnswers = new Array(MAX_QUESTIONS).fill('');
    this.currentIndex.set(0);
    this.finalScore.set(0);
    this.gameStatus.set('playing');
  }
}
