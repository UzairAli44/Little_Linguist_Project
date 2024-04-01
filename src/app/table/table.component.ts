import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  constructor(private dialog: MatDialog,private route:ActivatedRoute,private gameService : GameService){}
  id:any;
  catWords:any
  displayedColumns: string[] = ['position', 'Origin', 'Target',];
  dataSource: any[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id = param['id']
      // if(this.id){
       this.catWords =  this.gameService.get(Number(this.id));
       this.dataSource = this.catWords.words
      // }
    })
  }
  openDialog(card:any,isDelete?:any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {card,isDelete:isDelete, isWord:true, modalTitle:'Update Word', placeholder:'Enter New Word', label: 'In English'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  addNewWord(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {card:this.catWords,addNew:true,isWord:true,modalTitle:'Add New Word', placeholder:'Enter New Word', label:'In English'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
      // Handle any actions after the modal is closed
    });
  }
}
