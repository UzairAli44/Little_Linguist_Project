import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortingGameComponent } from '../sorting-game/sorting-game.component';
import { MatchingGameComponent } from '../matching-game/matching-game.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    SortingGameComponent,
    MatchingGameComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  gameType:any
  constructor(private route : ActivatedRoute,){}
  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.gameType = param['type'];
    })
  }

}
