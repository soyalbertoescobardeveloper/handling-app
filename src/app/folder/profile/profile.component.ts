import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = ''; 
  phone: string = '';
  constructor() { }

  ngOnInit() {}

}
