import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatListService } from '../services/chat-list.service';
import { environment } from 'src/environments/environment';

export interface ChatMessage {
  id: string;
  created_at: string;
  sender_id: number;
  receiver_id: number;
  lastMessage: string;
  time: string;
  contactName: string;
  contactImage: string;
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  chats: ChatMessage[] = [];
  appUrl = environment.apiUrl;

  constructor(private router: Router, private chatService: ChatListService) { }

  async ngOnInit() {
    (await this.chatService.getMessages()).subscribe(
      (data) => {
        this.chats = data;
      },
      (error) => {
        console.error('Error al obtener los mensajes:', error);
      }
    );
  }

  openChat(chat: any) {
    this.router.navigate(['/chat', chat.idChat]);
  }

}
