import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  appUrl = environment.apiUrl;
  
  constructor(private http: HttpClient,private storage: Storage) { }

 

 async saveToken(token: string): Promise<void> {
    const user = await this.storage.get('user');
    const apiUrl = this.appUrl + `api/saved-token/${user.id}`;
    const data = { token: token };
    this.http.post(apiUrl, data).subscribe(
      error => console.error('Error:', error)
    );
  }
}
