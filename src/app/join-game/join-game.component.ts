import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GameHttpService } from '../services/game-http.service';
import { GameModel } from '../models/game.model';
import { JoinGameModel } from '../models/join.game.model';
import { setGame, setPlayerName } from '../state-management/game.actions';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  gameId: string;
  joinGameModel: JoinGameModel = new JoinGameModel();
  gameModel: GameModel;

  constructor(private http: GameHttpService,
     private route: ActivatedRoute, 
     private router: Router,
     private store: Store<any>) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("gameId");
    this.joinGameModel.gameId = this.gameId;
  }

  joinGame(): void {
    console.log(this.joinGameModel);
    this.http.joinGame(this.joinGameModel)
        .subscribe((data: GameModel) => {
          this.gameModel = data;
          this.store.dispatch(setGame({game: this.gameModel, playerName: this.gameModel.player2Name}));

          this.router.navigate(['/game/', this.gameId]);
        });
  }
}
