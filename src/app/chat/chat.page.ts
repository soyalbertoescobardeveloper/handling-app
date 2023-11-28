import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, Platform } from '@ionic/angular';
import { ChatService, Chat, ChatMessage } from '../services/chat.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  chat: Chat | undefined;
  newMessage: string = '';
  private platform = inject(Platform);



  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    public translationService: TranslationService,
    ) { }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const chatId = params.get('id');
        if (chatId) {
          this.chat = this.chatService.getChatById(chatId);
        }
      });
    }
  
    getBackButtonText() {
      const isIos = this.platform.is('ios');
      return isIos ? 'Chats ' : '';
    }

    sendMessage() {
      if (this.newMessage.trim() && this.chat) {
        const message: ChatMessage = {
          sender: 'Yo', 
          content: this.newMessage,
          timestamp: new Date(),
          sentByMe: false
        };
        this.chat.messages.push(message);    
        this.newMessage = '';
        setTimeout(() => this.content?.scrollToBottom(300), 100);
      }
    }
  }