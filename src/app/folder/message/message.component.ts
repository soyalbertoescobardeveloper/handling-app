import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Message } from '../services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  private platform = inject(Platform);
  @Input() message?: Message;
  searchInput!: string;
  appUrl = environment.apiUrl;

  constructor(
    public translationService: TranslationService,
    private http: HttpClient,
    private storage: Storage
  ) {}

  ngOnInit() {}
  isIos() {
    return this.platform.is('ios');
  }


}
