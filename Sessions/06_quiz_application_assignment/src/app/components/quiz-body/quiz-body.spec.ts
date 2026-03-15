import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBody } from './quiz-body';

describe('QuizBody', () => {
  let component: QuizBody;
  let fixture: ComponentFixture<QuizBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizBody],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizBody);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
