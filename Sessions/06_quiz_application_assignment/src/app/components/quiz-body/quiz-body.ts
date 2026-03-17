import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
type GameStatus = "home" | "playing" | "end";
const MAX_QUESTIONS = 5;
@Component({
  selector: 'app-quiz-body',
  imports: [FormsModule, NgStyle],
  templateUrl: './quiz-body.html',
  styleUrls: ['./quiz-body.scss'],
})
export class QuizBody {
public titledata = input();
private correctanswers  = ["JavaScript", "File", "Cascading Style Sheets", "1995", "getElementById(id)"]

startQuiz(){ 
  this.gameStatus.set("playing")
}
public gameStatus = signal<GameStatus>("home");
public userAnswers:string[]=[];
public currentIndex = signal<number>(0);
public percentagebody =0;
public stars=[];
showResult(){
  let score = 0;
  for (let index = 0; index < this.correctanswers.length; index++) {
    if (this.correctanswers[index] === this.userAnswers[index]) {
      score++;
    }
  }
   this.percentagebody = score/MAX_QUESTIONS;
  

  return score;
}
public currentQuestion = computed(() =>
  this.QuizQuestions[this.currentIndex()]
);

// showstars(){

//   for (let index = 0; index < this.starsbody; index++) {
    
//   }
// }
previousQuestion(){

  //this.userAnswers[this.currentIndex()] = this.currentanswer;
  if (this.currentIndex()>0) {
    this.currentIndex.update(value => value - 1);
  }
}

nextQuestion(){ 
  //this.userAnswers[this.currentIndex()] = this.currentanswer;
  console.log(this.userAnswers);
  if (this.currentIndex()<MAX_QUESTIONS) {
    this.currentIndex.update(value => value + 1);
  }
  console.log("current index" + this.currentIndex());

  if (this.currentIndex() === MAX_QUESTIONS) {
    this.gameStatus.set("end");
  }
}

  public QuizQuestions = [
    {
      id: 1,
      question: "Which language runs in a web browser?",
      options: ["Python", "C++", "JavaScript", "Java"]
    },
    {
      id: 2,
      question: "Which of the following is a server-side JavaScript object?",
      options: ["Function", "File", "Date", "RegExp"]
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"]
    },
    {
      id: 4,
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "2000"]
    },
    {
      id: 5,
      question: "Which method is used to access an HTML element using JavaScript?",
      options: ["selectElement(i)", "getElementById(id)", "getElementByName(name)", "queryElement(i)"]
    }];

}