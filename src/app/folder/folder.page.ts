import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { IonSpinner } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { TokenService } from '../services/token.service';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  private apiUrl = environment.apiUrl;
  loading!: HTMLIonLoadingElement;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  appUrl = environment.apiUrl;
  searchInput!: string;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    public translationService: TranslationService,
    private storage: Storage,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}
  messages: any[] | null = [];
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null,
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
    const user = await this.storage.get('user');
    const token = await this.storage.get('access_token');
    if (user && user.id && token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.http
        .get(`${this.apiUrl}api/auth/agent/${user.id}`, { headers })
        .subscribe(
          (response: any) => {
            this.loading.dismiss();
            if (Array.isArray(response)) {
              this.messages = response;
            } else {
              console.error('La respuesta no es un array válido:', response);
              this.showInvalidResponseAlert();
              this.logout();
            }
          },
          (error) => {
            this.loading.dismiss();
            console.error('Error al realizar la solicitud HTTP', error);
          }
        );
    } else {
      this.loading.dismiss();
      this.logout();
    }

    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
      }
    });
    PushNotifications.addListener('registration', (token: Token) => {
      console.log(token.value);
      this.tokenService.saveToken(token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });
  }
  async showInvalidResponseAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Este usuario no es un Agente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async realizarSolicitudGET(inputValue: string): Promise<Observable<any>> {
    const user = await this.storage.get('user');
    const token = await this.storage.get('access_token');

    if (user && user.id && token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const url = this.appUrl + `api/auth/searcher/${user.id}/${inputValue}`;
      return this.http.get(url, { headers });
    } else {
      return new Observable();
    }
  }

  async updateData(event: any) {
    const query = event.target.value.toLowerCase();
    await this.delay(300);

    // this.loading = await this.loadingController.create({
    //   cssClass: 'custom-spinner',
    //   spinner: null,
    //   translucent: true,
    //   backdropDismiss: false,
    // });
    await this.loading.present();
    (await this.realizarSolicitudGET(query)).subscribe(
      (data) => {
        if (data && data.error) {
          this.messages = null;
        } else {
          this.messages = data;
        }
        // this.loading.dismiss();
      },
      (error) => {
        this.messages = null;
        // this.loading.dismiss();
        console.error('Error al realizar la solicitud GET:', error);
      }
    );
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  onSearchInputChange(event: { target: { value: string } }) {
    const query = event.target.value.toLowerCase();

    if (!this.searchInput || this.searchInput.trim() === '') {
      this.ngOnInit();
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
