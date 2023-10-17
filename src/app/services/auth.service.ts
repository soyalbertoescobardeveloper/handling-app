import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated!: boolean;

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage().then(() => {
      this.checkSession();
    });
  }

  async initStorage() {
    await this.storage.create();
  }

  async checkSession() {
    const token = await this.storage.get('access_token');
    console.log(token);
    if (token) {
      this.isAuthenticated = true;
      console.log(this.isAuthenticated);
    } else {
      this.isAuthenticated = false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const loginData = { email, password };

    try {
      const response: any = await this.http.post('https://handling-dev.sae.com.mx/api/auth/login', loginData).toPromise();

      if (response && response.access_token) {
        this.isAuthenticated = true;

        await this.storage.set('access_token', response.access_token);
        await this.storage.set('user', response.user);

        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      this.isAuthenticated = false;
      throw error;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.storage.remove('access_token'); // Eliminar el token al cerrar sesión.
    this.storage.remove('user'); // Eliminar los datos del usuario al cerrar sesión.
  }

  async isAuthenticatedUser(): Promise<boolean> {
    await this.initStorage();
    await this.checkSession();
    console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }
}


