import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslationService } from './services/translation.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public username: string | undefined;

  public appPages = [
    {
      title: this.translationService.getTranslation('operations'),
      url: '/folder/operations',
      icon: 'folder',
    },
    {
      title: this.translationService.getTranslation('profile'),
      url: '/folder/profile',
      icon: 'person-circle',
    },
    {
      title: this.translationService.getTranslation('notifications'),
      url: '/folder/notifications',
      icon: 'notifications',
    },
    {
      title: this.translationService.getTranslation('inbox'),
      url: '/chat-list',
      icon: 'mail',
    },
    {
      title: this.translationService.getTranslation('help'),
      url: '/folder/help',
      icon: 'cog',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage,
    public translationService: TranslationService,
    private tokenService: TokenService

  ) {
    this.translationService.languageChange.subscribe((language: string) => {
      this.appPages = [
        {
          title: this.translationService.getTranslation('operations'),
          url: '/folder/operations',
          icon: 'folder',
        },
        {
          title: this.translationService.getTranslation('profile'),
          url: '/folder/profile',
          icon: 'person-circle',
        },
        {
          title: this.translationService.getTranslation('notifications'),
          url: '/folder/notifications',
          icon: 'notifications',
        },
        {
          title: this.translationService.getTranslation('inbox'),
          url: '/chat-list',
          icon: 'mail',
        },
        {
          title: this.translationService.getTranslation('help'),
          url: '/folder/help',
          icon: 'cog',
        },
      ];
    });
  }

  async ngOnInit() {
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.name;
    }
  }

  async logout() {
    try {
      const logout = '';
      await this.tokenService.saveToken(logout);
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al borrar el token:', error);
    }
  }
}
