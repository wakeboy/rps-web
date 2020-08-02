import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'join-game/:gameId', component: JoinGameComponent },
  { path: 'game/:gameId', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
