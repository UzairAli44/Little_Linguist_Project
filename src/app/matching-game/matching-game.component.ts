import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-matching-game',
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
    MatSelectModule
  ],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css'
})
export class MatchingGameComponent implements OnInit{
  id:any
  catWords:any;
  originalData:any;
  score = 12;
  englishWords: string[] = [];
  hebrewWords: string[] = [];
  shuffledData:any;
  displayedColumns: string[] = ['Origin', 'Target',];
  selectedWord:any = null
  selectedIndex = -1;
  result:any = null;
  count = 1;
  totalGames: number = 0;
  totalPoints: number = 0;
  constructor(private dialogService : MatDialog,private route:ActivatedRoute,private categoriesService: CategoriesService){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id = param['id'];
      this.catWords =  this.categoriesService.get(Number(this.id));
      this.totalGames = this.categoriesService.getNumberOfGames();
      this.totalPoints = this.categoriesService.getTotalPoints();
       this.originalData = JSON.parse(JSON.stringify(this.catWords.words));
       this.getRandomObjects()
    })
  }

  checkAnswer(ele: any) {
    if (!this.selectedWord || ele.targetDisable) {
      return;
    }
  
    const index = this.originalData.findIndex((word: any) => word.origin === this.selectedWord);
    const correctTarget = this.originalData[index].target;
  
    let allCompleted: any = {};
    let totalQ = this.originalData.length;
  
    if (ele.target === correctTarget) {
      this.totalPoints += 2;
      this.categoriesService.setTotalPoints(this.totalPoints)
      this.result = 'Right';
    } else {
      this.score -= 2;
      this.result = 'Wrong';
    }
    ele.targetSelected = true;
    this.count++;
    if (this.count === totalQ + 1) {
      allCompleted.percentage = (this.score / (totalQ * 2)) * 100;
      allCompleted.isComplete = true;
      allCompleted.id = this.id
      this.totalGames++;
      this.categoriesService.setNumberOfGames(this.totalGames);
    }
  
    this.openDialog(ele, ele.target === correctTarget, allCompleted);
  }
  shuffleData(data: any[]): any[] {
    const shuffledData = [...data]; // Copy the array to avoid modifying the original
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i].target, shuffledData[j].target] = [shuffledData[j].target, shuffledData[i].target]; // Swap the targets
    }
    return shuffledData;
  }
  openDialog(ele:any,result:boolean,allCompleted:any){
    let dialogRef = this.dialogService.open(DeleteCategoryDialogComponent, {
      width:'300px',
      data:{ result: result,allCompleted}});

    dialogRef.afterClosed().subscribe(result => {
      this.result = null
      this.selectedWord = null
      ele.targetSelected = false
      this.shuffledData[this.selectedIndex].originDisable = true;
    });
  }
  selectOrigin(el:any,index:any){
    if(el.originDisable) return
    this.selectedIndex = index
    this.selectedWord = el.origin
    el.originSelected = true;
  }
  getOrdinal(count: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = count % 100;
    return count + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }
  getRandomObjects(): void {
    this.originalData = this.originalData.sort(() => Math.random() - 0.5).slice(0, 6);
    this.shuffledData  =  this.shuffleData(JSON.parse(JSON.stringify(this.originalData)));
  }
}
