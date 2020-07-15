import { Component, OnInit } from '@angular/core';
import { SignalrClientService } from '../services/signalr-client.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GameModel, Weapon } from '../models/game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  action: string;
  status: string;

  weapon = Weapon;  
  gameId: string;
  game: GameModel;
  playerName: string;

  constructor(public signalrClientService: SignalrClientService, private route: ActivatedRoute, private store: Store<any>){ }
  
  async ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get("gameId");
    this.game = this.signalrClientService.game;
    this.store.select('game').subscribe(g => {
      this.playerName = g.playerName;
 
      this.signalrClientService.startConnection()
        .then(() => {
          this.signalrClientService.addReceveMessageListener();
          this.signalrClientService.joinGroup(this.gameId);
          this.signalrClientService.addPickListener();
        });

    });
  }

  userPick(userWeapon: Weapon): void {
    console.log(userWeapon);
    this.signalrClientService.pick(this.gameId, this.playerName, userWeapon);
  }
}
