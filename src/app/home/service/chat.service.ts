import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../Entities/room';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Message} from '../Entities/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public SaveRoom(room: Room): Observable<Room>
  {
    return this.http.post<Room>(`${environment.baseUrl}:8085/Rooms/`, room);
  }

  public RemoveRoomByGrupeId(groupeId: bigint): Observable<boolean>
  {
    return this.http.delete<boolean>(`${environment.baseUrl}:8085/Rooms/${groupeId}`);
  }

  public GetRoomByGroupeId(groupeId: bigint | undefined): Observable<Room>
  {
    return this.http.get<Room>(`${environment.baseUrl}:8085/Rooms/${groupeId}`);
  }

  public GetMessagesByRoomId(roomId: bigint): Observable<Message[]>
  {
    return this.http.get<Message[]>(`${environment.baseUrl}:8085/Rooms/messages/${roomId}`);
  }

  public SendMessage(message: Message, roomId: bigint): Observable<Message>
  {
    return this.http.post<Message>(`${environment.baseUrl}:8085/Rooms/Messages/${roomId}`, message);
  }

  public GetLastMessagesByRoomId(roomId: bigint | undefined): Observable<Message>
  {
    return this.http.get<Message>(`${environment.baseUrl}:8085/Rooms/messages/Last/${roomId}`);
  }
}
