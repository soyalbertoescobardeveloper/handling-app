import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Storage } from '@ionic/storage-angular';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  private _storage: Storage | null = null;

  constructor(private authService: AuthService, private router: Router, private modalController: ModalController,
    private toastController: ToastController,private storage: Storage, private tokenService: TokenService) { 
      this.init();
    }
    async init() {
      const storage = await this.storage.create();
      this._storage = storage;
    }

  ngOnInit() {
  

    // PushNotifications.addListener('registration',
    //   (token: Token) => {
    //     console.log(token.value);
    //     this.tokenService.saveToken(token.value);
    //   }
    // );
   
  }



  async presentGenericModal(title: string, message: string) {
    const modal = await this.modalController.create({
      component: GenericModalComponent,
      componentProps: {
        title,
        message,
      }
    });
    return await modal.present();
  }

  login() {
    if (!this.email || !this.password) {
      return;
    }
    this.authService.login(this.email, this.password)
      .then((result) => {
        if (result) {
          this.router.navigate(['folder/operations']);
        }
        else {
          this.openCustomDialogModal();
        }
      })
      .catch((error) => {
        console.error('Error de autenticación:', error);
        this.presentGenericModal('Error de Autenticación', 'Credenciales incorrectas');
        this.openCustomDialogModal();
      });
  }
  openCustomDialogModal() {
    const modal = document.querySelector('ion-modal#example-modal') as HTMLIonModalElement;
    modal.present();
  }

}
