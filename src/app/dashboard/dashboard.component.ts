import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,CommonModule,MatIconModule,MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  totalGames:any = 0;
  totalPoints:any = 0;
  constructor(private gameService:GameService){}
  ngOnInit(): void {
    this.totalGames = this.gameService.getNumberOfGames();
    this.totalPoints = this.gameService.getTotalPoints();
  }
}
