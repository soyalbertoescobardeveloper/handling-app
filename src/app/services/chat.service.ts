import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, Subject, from, switchMap, tap } from 'rxjs';
import { Message } from '../folder/services/data.service';


export interface ChatMessage {
  sender: string;
  content: string;
  timestamp: Date;
  sentByMe: boolean;
}

export interface Chat {
  recipientId: any;
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
  private currentChatMessages: ChatMessage[] = []; 
  private currentChat: Chat | undefined;
  appUrl = environment.apiUrl;

  private currentChatMessagesSource = new BehaviorSubject<ChatMessage[]>([]);
  currentChatMessages$ = this.currentChatMessagesSource.asObservable();
  private newMessageSubject = new Subject<ChatMessage>();

  constructor(private http: HttpClient,private storage: Storage) { }

  getChatById(chatId: string): Observable<Chat> {
    return from(this.storage.get('user')).pipe(
      switchMap((user: { id: any; }) => {
        return this.http.get<Chat>(`${this.appUrl}api/get-chat/${user.id}/${chatId}`).pipe(
          tap(chat => {
            this.currentChat = chat; 
          })
        );
      })
    );
  }
  addMessageToCurrentChat(message: any) {
    const newMessage: ChatMessage = {
      sender: 'Yo', 
      content: message, 
      timestamp: new Date(),
      sentByMe: true
    };
    const updatedMessages = [...this.currentChatMessagesSource.value, newMessage];
    this.currentChatMessagesSource.next(updatedMessages);
    console.log(this.currentChatMessagesSource);
  }

  getNewMessages() {
    return this.newMessageSubject.asObservable();
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
