import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignalrClientService {
  public data: any;
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

  public pick(weapon: string): void {
    this.hubConnection.invoke("echo", weapon);
  }

  public addPickListener(): void {
    this.hubConnection.on('send', (msg) => {
      this.data = msg;
      console.log("SignalR Data: " + msg);
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