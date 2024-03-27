import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParentHomeComponent } from '../parent-home/parent-home.component';
@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ParentHomeComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  constructor() {}
}
