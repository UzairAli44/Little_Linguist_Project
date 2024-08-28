import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameService } from '../../shared/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameLevel } from '../../shared/model/language';

@Component({
  selector: 'app-sorting-game',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  templateUrl: './sorting-game.component.html',
  styleUrl: './sorting-game.component.css'
})
export class SortingGameComponent implements OnInit{
  words: any[] = [];
  randomCategory: any;
  wordIndex: number = 0;
  score: number = 0;
  word!: any;
  currentCategoryWords: any;
  randomCategoryWords: any;
  result:any;
  id:any;
  totalGames: number = 0;
  totalPoints: number = 0;
  currentCategory: any;
  gameId:any;
  constructor(private dialog: MatDialog, private gameService: GameService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.wordIndex = 0;
    this.route.params.subscribe(param=>{
      this.id = param['id'];
      this.totalGames = this.gameService.getNumberOfGames();
      this.totalPoints = this.gameService.getTotalPoints();
      this.gameId = this.gameService.getGameId();
      this.gameId = this.gameId + 1;
      let categories = this.gameService.list();
      this.currentCategory = categories.find(cat=>cat.id == this.id);
      const randomIndex = Math.floor(Math.random() * categories.length);
      this.randomCategory = categories[randomIndex];
      let currentCatWords =  this.gameService.get(Number(this.id))?.words as any;
      currentCatWords = this.gameService.shuffle(currentCatWords);
      this.currentCategoryWords = currentCatWords.slice(0,3);
      let randomCatWords = this.gameService.get(Number(this.randomCategory.id))?.words as any;
      randomCatWords = this.gameService.shuffle(randomCatWords);
      this.randomCategoryWords = randomCatWords.slice(0,3)
      this.words = this.gameService.shuffle([...this.currentCategoryWords, ...this.randomCategoryWords]);
      this.word = this.words[this.wordIndex];
    })
    
  }

  checkAnswer(isYes: boolean) {
    const belongsToCategory = this.currentCategoryWords.includes(this.word);
    if ((isYes && belongsToCategory) || (!isYes && !belongsToCategory)) {
      this.score++;
      // Open success dialog
      this.result = 'Pass';
      this.totalPoints += 2;
      this.gameService.setTotalPoints(this.totalPoints)
      this.words[this.wordIndex].guess = 1
    } else {
      // Open failure dialog
      this.result = 'Fail';
      this.words[this.wordIndex].guess = 0
    }
    this.wordIndex++;
    if (this.wordIndex < this.words.length) {
      this.word = this.words[this.wordIndex];
    } else {
      this.totalGames++;
      this.gameService.setNumberOfGames(this.totalGames);
      this.gameService.setGamesData({
        Id: this.gameId,
        category: GameLevel.Trivia.title,
        date: new Date(),
      });
      this.gameService.setGameId(this.gameId)
    }
  }
  startNewGame(){
    this.ngOnInit()
  }
}
