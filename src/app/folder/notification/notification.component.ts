import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslationService } from 'src/app/services/translation.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
} from '@capacitor/push-notifications';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationHandlerService } from 'src/app/services/notification-handler.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    public translationService: TranslationService,
    private toastController: ToastController,
    private router: Router,
    private notificationHandlerService: NotificationHandlerService
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async ngOnInit() {
    const storedNotifications = await this.storage.get('notifications');
    if (storedNotifications) {
      this.notifications = storedNotifications;
      this.notifications.reverse();
    }
    this.notifications = this.notificationHandlerService.notifications;


  //   PushNotifications.addListener(
  //     'pushNotificationReceived',
  //     async (notification: PushNotificationSchema) => {
  //         const message = notification.data.message;
  //         const idUser = notification.data.idUser;
  
  //         if (!notification.title) {
  //           const toast = await this.toastController.create({
  //             header: 'Nuevo Mensaje',
  //             message: message,
  //             position: 'top',
  //             duration: 4000,
  //             buttons: [
  //                 {
  //                     text: 'Ver Mensaje',
  //                     handler: () => {
  //                         this.router.navigate(['chat/' + idUser], { queryParams: { message: message } });
  //                     }
  //                 }
  //             ]
  //         });
  //         await toast.present();
          
  //         } else {
  //             const toast = await this.toastController.create({
  //                 header: notification.title,
  //                 message: message,
  //                 position: 'top',
  //                 duration: 3000,
  //             });
  //             await toast.present();
  //             this.saveNotification(notification);
  //             if (!Array.isArray(this.notifications)) {
  //                 this.notifications = [];
  //             }
  //             this.notifications.unshift(notification);
  //             this.router.navigate(['folder/notifications']);
  //         }
  //     }
  // );
  

  //   PushNotifications.addListener(
  //     'pushNotificationActionPerformed',
  //     (notification: ActionPerformed) => {
  //       if (!notification.notification.title) {
  //         this.router.navigate(['chat-list']);
  //       } else {
  //         this.saveNotification(notification);
  //         if (!Array.isArray(this.notifications)) {
  //           this.notifications = [];
  //         }
  //         this.notifications.unshift(notification);
  //         this.router.navigate(['folder/notifications']);
  //       }
  //     }
  //   );
  }

  // async saveNotification(
  //   notificationData: PushNotificationSchema | ActionPerformed
  // ) {
  //   let savedNotification;
  //   if ('notification' in notificationData) {
  //     const notification = notificationData.notification;
  //     savedNotification = {
  //       title: notification.title,
  //       body: notification.body,
  //     };
  //   } else {
  //     savedNotification = {
  //       title: notificationData.title,
  //       body: notificationData.body,
  //     };
  //   }
  //   const notifications = (await this._storage?.get('notifications')) || [];
  //   notifications.push(savedNotification);
  //   await this._storage?.set('notifications', notifications);
  // }
}
