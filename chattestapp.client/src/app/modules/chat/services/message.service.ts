import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';
import { environment } from '../../../../environments/environment';
import { CreateMessageDto } from '../model/create-message-dto';

@Injectable()
export class MessageService {
  private apiUrl = `${environment.apiUrl}/message`;

  constructor(private http: HttpClient) { }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  public sendMessage(message: CreateMessageDto): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }
}
