import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, switchMap } from 'rxjs';


export interface ChatMessage {
  sender: string;
  content: string;
  timestamp: Date;
  sentByMe: boolean;
}

export interface Chat {
  id: string;
  contactName: string; 
  contactImage: string;
  messages: ChatMessage[];

}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats: Chat[] = [];
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient,private storage: Storage) { }

  getChatById(chatId: string): Observable<Chat> {
    return from(this.storage.get('user')).pipe(
      switchMap((user: { id: any; }) => this.http.get<Chat>(`${this.appUrl}api/get-chat/${user.id}/${chatId}`))
    );
  }


  sendMessage(senderId: string, receiverId: string, body: string): Observable<any> {
    const url = `${this.appUrl}api/send-message`;
    const data = {
      sender_id: senderId,
      receiver_id: receiverId,
      body: body
    };
    return this.http.post(url, data);
  }

}
