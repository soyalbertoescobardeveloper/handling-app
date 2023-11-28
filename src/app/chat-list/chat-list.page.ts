import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {
  chats = [
    {
      id: '1',
      contactName: 'Juan Pérez',
      contactImage: 'https://www.blogdelfotografo.com/wp-content/uploads/2022/01/retrato-anillo-luz.webp',
      lastMessage: '¡Hola! ¿Cómo estás?',
      time: '10:45 AM'
    },
    {
      id: '2',
      contactName: 'Ana Gómez',
      contactImage: 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/perfil-resilencia.jpg',
      lastMessage: 'Nos vemos mañana',
      time: '9:10 AM'
    },
    {
      id: '3',
      contactName: 'Carlos López',
      contactImage: 'https://qph.cf2.quoracdn.net/main-qimg-3bb9e54e9cbd36f7157615cdc5969733-lq',
      lastMessage: 'Te envié el documento',
      time: 'Ayer'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openChat(chat: any) {
    console.log("metod open chat");
    this.router.navigate(['/chat', chat.id]);

  }

}
