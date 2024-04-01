import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoriesComponent } from '../categories/categories.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../shared/model/category';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-parent-home',
  standalone: true,
  imports: [MatCardModule,CommonModule,CategoriesComponent,MatButtonModule,MatIconModule],
  templateUrl: './parent-home.component.html',
  styleUrl: './parent-home.component.css'
})
export class ParentHomeComponent implements OnInit{
  constructor(private dialog: MatDialog, private gameService : GameService,){}
  dataSource : Category[] = [];
  @Input() isChild:boolean = false
  cardData:any[] =  [
    {
      id:1,
      name:'Test'
    },
    {
      id:2,
      name:'Test 1'
    },
    {
      id:3,
      name:'Test 3'
    },
    {
      id:5,
      name:'Test 4'
    },
    {
      id:1,
      name:'Test'
    },
    {
      id:2,
      name:'Test 1'
    },
    {
      id:3,
      name:'Test 3'
    },
    {
      id:5,
      name:'Test 4'
    },

  ];
  ngOnInit(): void {
    this.getData()
  }
  addNewCat(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {addNew:true, modalTitle: 'Add New Category', placeholder:'Enter New Category',label: 'Category'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.getData()
      // Handle any actions after the modal is closed
    });
  }
  getData(){
    this.dataSource = this.gameService.list();
  }
}
