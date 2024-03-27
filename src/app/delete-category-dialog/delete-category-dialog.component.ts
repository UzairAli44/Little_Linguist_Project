import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GameLevel } from '../../shared/model/language';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './delete-category-dialog.component.html',
  styleUrl: './delete-category-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCategoryDialogComponent {
  // selectedGame:any = GameLevel.MatchingGame;
  availableGames: any[] = [GameLevel.MatchingGame,GameLevel.Trivia,GameLevel.Bilingual]
  selectedGame: any = GameLevel.MatchingGame; // Set default selection to GameLevel.MatchingGame
  GameLevel = GameLevel;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private route:Router){}

  play(){
    if(this.data.id != undefined)
      this.route.navigate(['/game',this.data.id])
    else if(this.data.allCompleted.isComplete)
      this.route.navigate(['/game',this.data.allCompleted.id])
  }
  change(value:any){
    console.log(value)
    if(value.value == GameLevel.Bilingual.title){
      this.selectedGame = GameLevel.Bilingual
    }
    else if(value.value == GameLevel.Trivia.title){
      this.selectedGame = GameLevel.Trivia
    }
    else this.selectedGame = GameLevel.MatchingGame
  }
 }
