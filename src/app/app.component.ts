import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Operations', url: '/folder/operations', icon: 'mail' },
    { title: 'Profile', url: '/folder/profile', icon: 'paper-plane' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authService: AuthService,private router: Router) {}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
