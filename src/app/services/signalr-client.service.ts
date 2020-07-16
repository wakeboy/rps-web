import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Weapon, GameModel, Game } from '../models/game.model';
import { Subject } from 'rxjs';
import { AppState } from '../state-management/game.reducer';
import { Store } from '@ngrx/store';
import { setGame } from '../state-management/game.actions';

@Injectable({
  providedIn: 'root'
})
export class SignalrClientService {
  public gameNotification: any;
  private hubConnection: signalR.HubConnection;

  constructor(private store: Store<AppState>) {
    console.log(environment.gameSignalRHubUrl)
   }

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.gameSignalRHubUrl)
      .build();

    return this.hubConnection
        .start()
        .then(() => { 
          console.log("Connection started");
        })
        .catch(error => console.log("Error while starting connection:" + error))
        .finally(() => console.log("finally"));
  }

  public pick(groupId: string, user: string, weapon: Weapon): void {
    this.hubConnection.invoke("pick", groupId, user, weapon);
  }

  public addPickListener(): void {
    this.hubConnection.on('RecieveGame', (game: GameModel) => {
      this.store.dispatch(setGame({ game: game}));
    });
  }

  public joinGroup(gameId: string): void {
    this.hubConnection.invoke("joingroup", gameId).catch(err => console.error(err));
  }

  public addReceveMessageListener(): void {
    this.hubConnection.on('ReceiveMessage', (msg) => {
      this.gameNotification = msg;
    });
  }
}