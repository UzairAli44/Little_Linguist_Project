import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '../modal/modal.component';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatIconModule,MatMenuModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() cardData:any[] = [];
  @Input() isChild:boolean = false

  constructor(private dialog: MatDialog,private route: Router,private categoriesService : CategoriesService,){}
  openDialog(card:any,isDelete?:any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {card, isDelete:isDelete, modalTitle: isDelete?'Update Category':'Confirmation Required', placeholder:'Enter New Category', label: 'Category'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the modal is closed
    });
  }
  navigateToWords(card:any){
    if(this.isChild){
      this.deleteCategory(card.id)
    }
    else
      this.route.navigate(['/words', card.id]); 
  }
  deleteCategory(id : number) {
    let dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data:{ id: id}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }});
  }
}
