import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { Weapon, GameModel } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrClientService {
  public game: GameModel = new GameModel();
  public gameNotification: any;
  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.gameSignalRHubUrl)
      .build();

    return this.hubConnection
        .start()
        .then(() => { 
          console.log("Connection started");
        })
        .catch(error => console.log("Error while starting connection:" + error));
  }

  public pick(groupId: string, user: string, weapon: Weapon): void {
    this.hubConnection.invoke("pick", groupId, user, weapon);
  }

  public addPickListener(): void {
    this.hubConnection.on('RecieveGame', (game) => {
      console.log(game);
      this.game = game;
    });
  }

  public joinGroup(gameId: string): void {
    this.hubConnection.invoke("JoinGroup", gameId);
  }

  public addReceveMessageListener(): void {
    this.hubConnection.on('ReceiveMessage', (msg) => {
      this.gameNotification = msg;
    });
  }
}