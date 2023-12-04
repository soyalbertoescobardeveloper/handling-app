import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, Platform } from '@ionic/angular';
import { ChatService, Chat, ChatMessage } from '../services/chat.service';
import { TranslationService } from '../services/translation.service';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false })
  content!: IonContent;

  chat: Chat | undefined;
  newMessage: string = '';
  private platform = inject(Platform);
  appUrl = environment.apiUrl;
  chatId: string = '';
  senderId: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    public translationService: TranslationService,
    private storage: Storage,
    ) { }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const chatId = params.get('id');
        if (chatId) {
          this.chatId = chatId; 
          this.chatService.getChatById(chatId).subscribe(
            (data) => {
              this.chat = data;
              setTimeout(() => this.content.scrollToBottom(300), 100);
            },
            (error) => {
              console.error('Error al obtener el chat:', error);
            }
          );
        }

        this.route.queryParams.subscribe(queryParams => {
          const receivedMessage = queryParams['message'];
          if (receivedMessage) {
            const newMessage: ChatMessage = {
              sender: 'Yo', 
              content: receivedMessage, 
              timestamp: new Date(),
              sentByMe: true
            };
            this.chat!.messages.push(newMessage);
            setTimeout(() => this.content.scrollToBottom(300), 100);         
          }
        });
      });
    }
  
    openDirectory(){
      
    }
    getBackButtonText() {
      const isIos = this.platform.is('ios');
      return isIos ? 'Chats ' : '';
    }

    async sendMessage() {
      if (this.newMessage.trim() && this.chat) {
        const message: ChatMessage = {
          sender: 'Yo', 
          content: this.newMessage,
          timestamp: new Date(),
          sentByMe: false
        };
        this.chat.messages.push(message);
        const user = await this.storage.get('user');
        this.senderId = user.id;
        this.chatService.sendMessage(this.chatId, this.senderId, this.newMessage)
        .subscribe(
          response => console.log('Mensaje enviado', response),
          error => console.error('Error al enviar mensaje', error)
        );

          this.newMessage = '';
          setTimeout(() => this.content?.scrollToBottom(300), 100);
        }
      
    }
  }