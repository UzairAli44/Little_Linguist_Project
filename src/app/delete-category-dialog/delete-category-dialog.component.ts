import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
  availableGames: any[] = [GameLevel.MatchingGame,GameLevel.Trivia,GameLevel.Bilingual]
  selectedGame: any; // Set default selection to GameLevel.MatchingGame
  GameLevel = GameLevel;
  constructor(@Inject(MAT_DIALOG_DATA) public data : any, private route:Router,public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>){}

  play(){
    if(this.data.id != undefined){
      if (this.selectedGame == GameLevel.MatchingGame) {
        this.route.navigate(['/game','matching',this.data.id])
      }
      else {
        this.route.navigate(['/game','sorting',this.data.id])
      }
      this.dialogRef.close()
    }
    else if(this.data.allCompleted.isComplete)
      this.dialogRef.close(this.data.allCompleted);
    else
      this.dialogRef.close()
  }
  navigateBack(){
    this.route.navigate(['/'])
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
