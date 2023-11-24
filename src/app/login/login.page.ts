import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Storage } from '@ionic/storage-angular';

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
    private toastController: ToastController,private storage: Storage) { 
      this.init();
    }
    async init() {
      const storage = await this.storage.create();
      this._storage = storage;
    }

  ngOnInit() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      } else {
      }
    });

    PushNotifications.addListener('registration',
      (token: Token) => {
        console.log(token.value);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // PushNotifications.addListener(
    //   'pushNotificationReceived',
    //   async (notification: PushNotificationSchema) => {
    //     const toast = await this.toastController.create({
    //       header: notification.title,
    //       message: notification.body,
    //       position: 'top',
    //       duration: 3000
    //     });
    //     await toast.present();
    //     this.saveNotification(notification);
    //     this.router.navigate(['folder/notifications']);
    //   },
    // );

    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   (notification: ActionPerformed) => {
    //     this.saveNotification(notification);
    //     console.log(notification);
    //     this.router.navigate(['folder/notifications']);
    //   },
    // );
  }

  // async saveNotification(notificationData: PushNotificationSchema | ActionPerformed) {
  //   let savedNotification;
  //   if ('notification' in notificationData) {
  //     const notification = notificationData.notification;
  //     savedNotification = {
  //       title: notification.title,
  //       body: notification.body
  //     };
  //   } else {
  //     savedNotification = {
  //       title: notificationData.title,
  //       body: notificationData.body
  //     };
  //   }
  //   const notifications = await this._storage?.get('notifications') || [];
  //   notifications.push(savedNotification);
  //   await this._storage?.set('notifications', notifications);
  // }

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
