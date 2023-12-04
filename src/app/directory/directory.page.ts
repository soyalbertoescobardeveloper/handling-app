import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DirectoryService } from '../services/directory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  private platform = inject(Platform);
  directories: any;
  appUrl = environment.apiUrl;

  
  constructor(private router: Router, private directoryService: DirectoryService) { }

  async ngOnInit() {
  (await this.directoryService.getDirectory()).subscribe(
    (data) => {
      this.directories = data;
    },
    (error) =>{
      console.error('Error al obtener los mensajes:', error);
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Chats ' : '';
  }

  openChat(chat: any) {
    this.router.navigate(['/chat', chat.id]);
  }

}
