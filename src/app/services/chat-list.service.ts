import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatListService {
  appUrl = environment.apiUrl;
  private apiUrl = this.appUrl + 'api/get-messages/';

  constructor(private http: HttpClient, private storage: Storage) { }

  async getMessages(): Promise<Observable<any[]>> {
    const user = await this.storage.get('user');
    return this.http.get<any[]>(this.apiUrl+user.id);
  }

}
