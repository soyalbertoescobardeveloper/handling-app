import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Message } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {
  private platform = inject(Platform);
  @Input() message?: Message;
  constructor() { }

  ngOnInit() {}
  isIos() {
    return this.platform.is('ios')
  }
}
