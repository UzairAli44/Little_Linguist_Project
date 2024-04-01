import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameService } from '../../shared/services/game.service';
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
import { TranslatedWord } from '../../shared/model/translated-word';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  currentCategory = new Category(0, '', Language.English, Language.Hebrew);
  newCatText: any = '';
  newWordInHebrew: any = '';
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject the data passed to the modal
  ) {}

  onCloseClick(): void {
    console.log(this.data);
    this.dialogRef.close(); // Close the modal
  }
  updateCat() {
    if(this.data.isDelete){
      this.gameService.delete(this.data.card.id);
      this.dialogRef.close({isDelete:this.data.isDelete,id:this.data.card.id})
      return
    }
    this.dialogRef.close()
    if (!this.data.isWord) {
      if (this.data.addNew) {
        this.currentCategory.name = this.newCatText;
        this.gameService.add(this.currentCategory);
      } else {
        this.currentCategory = this.data.card;
        this.gameService.update(this.currentCategory);
      }
    } else {
      this.currentCategory = this.data.card
      this.currentCategory.words = [
        ...this.currentCategory.words,
        new TranslatedWord(this.newCatText, this.newWordInHebrew),
      ];
      this.gameService.update(this.currentCategory);
    }
  }
}
