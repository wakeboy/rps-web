import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrClientService {
  public data: any;
  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44339/gamehub")
      .build();

    this.hubConnection
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
}