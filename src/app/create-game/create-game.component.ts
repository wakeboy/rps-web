import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameHttpService } from '../services/game-http.service'
import { CreateGameModel } from '../models/create.game.model';
import { GameModel } from '../models/game.model';
import { setGame } from '../state-management/game.actions';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {
  createGameModel: CreateGameModel = new CreateGameModel();
  gameModel: GameModel;

  constructor(private http: GameHttpService, private store: Store<any>) { }

  createGame(): void {
    this.http.createGame(this.createGameModel)
        .subscribe((data: GameModel) => {
          this.gameModel = data;
          this.store.dispatch(setGame({game: this.gameModel}));
        });
  }

  getGame(): void {
    this.store.pipe(select('game'));

    this.store.pipe(select('game')).subscribe((g) => console.log(g));
    this.store.select('game').subscribe(d => console.log(d));
  }

  getInviteUrl(): string {
    return window.location.origin + '/join-game/' + this.gameModel.id;
  }
}
