import { Injectable } from '@angular/core';

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
  private chats: Chat[] = [
    {
      id: '1',
      contactName: 'Alberto Escobar 1',
      contactImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
      messages: [
        { sender: 'Juan Pérez', content: '¡Hola! ¿Cómo estás?', timestamp: new Date(),sentByMe: false },
        { sender: 'Yo', content: 'Bien, gracias. ¿Y tú?', timestamp: new Date(),sentByMe: true }
      ]
    },
    {
      id: '2',
      contactName: 'Alberto Escobar 2', 
      contactImage: 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/perfil-resilencia.jpg',
      messages: [
        { sender: 'Ana Gómez', content: 'Nos vemos mañana', timestamp: new Date(),sentByMe: true }
      ]
    }
  ];

  constructor() { }

  getChatById(chatId: string): Chat | undefined {
    return this.chats.find(chat => chat.id === chatId);
  }
}
