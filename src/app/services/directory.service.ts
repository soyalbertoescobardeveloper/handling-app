import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  appUrl = environment.apiUrl;
  private apiUrl = this.appUrl + 'api/directory/';

  constructor(private http: HttpClient, private storage: Storage) { }

  async getDirectory(): Promise<Observable<any[]>>{
    const user = await this.storage.get('user');
    return this.http.get<any[]>(this.apiUrl+user.id);
  }
}
