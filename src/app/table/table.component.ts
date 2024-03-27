import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatCardModule,CommonModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  constructor(private dialog: MatDialog,private route:ActivatedRoute,private categoriesService : CategoriesService,){}
  id:any;
  catWords:any
  displayedColumns: string[] = ['position', 'Origin', 'Target',];
  dataSource: any[] = [
    // {position: 1, name: 'Hydrogen', Target: 1.0079,},
    // {position: 2, name: 'Helium', Target: 4.0026,},
    // {position: 3, name: 'Lithium', Target: 6.941,},
    // {position: 4, name: 'Beryllium', Target: 9.0122,},
    // {position: 5, name: 'Boron', Target: 10.811,},
    // {position: 6, name: 'Carbon', Target: 12.0107,},
    // {position: 7, name: 'Nitrogen', Target: 14.0067,},
    // {position: 8, name: 'Oxygen', Target: 15.9994,},
    // {position: 9, name: 'Fluorine', Target: 18.9984,},
    // {position: 10, name: 'Neon', Target: 20.1797},
  ];
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.id = param['id']
      // if(this.id){
       this.catWords =  this.categoriesService.get(Number(this.id));
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
      // Handle any actions after the modal is closed
    });
  }

  addNewWord(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {card:this.catWords,addNew:true,isWord:true,modalTitle:'Add New Word', placeholder:'Enter New Word', label:'In English'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the modal is closed
    });
  }
}
