import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';

@Injectable()
export class SignalRService {
  private hubUrl = `${environment.baseUrl}/chatHub`;

  private readonly _hubConnection: signalR.HubConnection;

  constructor() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build();
  }

  public startConnection = (): void => {
    this._hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public stopConnection = (): void => {
    this._hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.log('Error while stopping connection: ' + err))
  }

  public onMessageReceived(callback: (message: Message) => void):  void {
    this._hubConnection.on('ReceiveMessage', callback);
  }

  public sendMessage = (message: Message): Promise<any> => this._hubConnection
    .invoke('SendMessage', message)
    .catch((err: any) => console.error(err));
}
