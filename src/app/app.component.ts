import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public username: string | undefined;

  public appPages = [
    { title: 'Operations', url: '/folder/operations', icon: 'mail' },
    { title: 'Profile', url: '/folder/profile', icon: 'paper-plane' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthService,private router: Router, private storage: Storage,) {}

  async ngOnInit() {
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.name;
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
