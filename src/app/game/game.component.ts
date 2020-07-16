import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrClientService } from '../services/signalr-client.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GameModel, Weapon, Winner } from '../models/game.model';
import { selectAppState } from '../state-management/game.selector';
import { resetGame } from '../state-management/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  action: string;
  status: string;

  weapon = Weapon;
  winner = Winner;
  gameId: string;
  game: GameModel;
  playerName: string;
  ready: boolean = false;
  currentSelection: Weapon = Weapon.None;

  constructor(public signalrClientService: SignalrClientService, private route: ActivatedRoute, private store: Store<any>){ }
  ngOnDestroy(): void {
    this.store.dispatch(resetGame());
  }
  
  async ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get("gameId");

    this.store.pipe(select(selectAppState)).subscribe(state => {
      this.game = state.game;
      this.playerName = state.playerName;
      this.updatePageProps();
    });
    
    this.signalrClientService.startConnection()
      .then(() => {
        this.signalrClientService.addReceveMessageListener();
        this.signalrClientService.joinGroup(this.gameId);
        this.signalrClientService.addPickListener();
      });
  }

  userPick(userWeapon: Weapon): void {
    if (this.currentSelection !== this.weapon.None)
      return;
    this.signalrClientService.pick(this.gameId, this.playerName, userWeapon);
    this.currentSelection = userWeapon;
  }

  private updatePageProps(): void {
    if (this.game.player1.name && this.game.player2.name)
      this.ready = true;

      if (this.game.player1.selection === Weapon.None && this.game.player2.selection === this.weapon.None)
        this.currentSelection = Weapon.None;
  }
}
