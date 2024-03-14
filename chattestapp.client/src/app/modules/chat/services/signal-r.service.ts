import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRService {
  private hubUrl = `${environment.baseUrl}/chatHub`;

  private readonly _hubConnection: signalR.HubConnection;

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build();
  }

  public get hubConnection() {
    return this._hubConnection;
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public onMessageReceived(callback: (message: any) => void) {
    this._hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage(userName: string, message: string) {
    this._hubConnection
      .invoke('SendMessage', userName, message)
      .catch((err: any) => console.error(err));
  }
}