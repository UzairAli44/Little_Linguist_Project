import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ParentHomeComponent } from './parent-home/parent-home.component';
import { TableComponent } from './table/table.component';
import { MatchingGameComponent } from './matching-game/matching-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path: "", component: CategoriesListComponent},
    {path: "parent", component: ParentHomeComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "help", component: HelpPageComponent},
    {path: "game/:id", component: MatchingGameComponent},
    {path: "game/:type/:id", component: GameComponent},
    {path: "words/:id", component: TableComponent},
];
