import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GameHttpService } from '../services/game-http.service'
import { CreateGameModel } from '../models/create.game.model';
import { GameModel } from '../models/game.model';
import { setGame, setPlayerName } from '../state-management/game.actions';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {
  createGameModel: CreateGameModel = new CreateGameModel();
  gameModel: GameModel;
  errors: string[] = [];

  constructor(private http: GameHttpService, private store: Store<any>) { }

  createGame(): void {
    this.http.createGame(this.createGameModel)
        .subscribe((data: GameModel) => {
          this.gameModel = data;
          this.store.dispatch(setGame( {game: this.gameModel, playerName: this.createGameModel.playerName }));
        }, 
        error => this.errors.push(error));
  }

  closeErrorAlert(): void {
    this.errors = [];
  }

  getInviteUrl(): string {
    return window.location.origin + '/join-game/' + this.gameModel.id;
  }

  copyInviteUrl(): void {
    var tb = document.createElement('textarea');
    tb.style.position ='fixed';
    tb.style.left = '0';
    tb.style.top = '0';
    tb.style.opacity = '0';
    tb.value = this.getInviteUrl();
    document.body.appendChild(tb);
    tb.focus();
    tb.select();
    document.execCommand('copy');
    document.body.removeChild(tb);
  }
}
