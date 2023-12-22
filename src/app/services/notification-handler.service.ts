import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  PushNotificationSchema,
  PushNotifications,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationHandlerService {
  private _storage: Storage | null = null;
  public notifications: any[] = [];
  public notificationReceived = new EventEmitter<
    PushNotificationSchema | ActionPerformed
  >();

  constructor(
    private storage: Storage,
    private toastController: ToastController,
    private router: Router,
    private chatService: ChatService
  ) {
    this.init();
  }
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.initializePushNotifications();
  }

  async saveNotification(
    notificationData: PushNotificationSchema | ActionPerformed
  ) {
    let savedNotification;
    if ('notification' in notificationData) {
      const notification = notificationData.notification;
      savedNotification = {
        title: notification.title,
        body: notification.body,
      };
    } else {
      savedNotification = {
        title: notificationData.title,
        body: notificationData.body,
      };
    }
    const notifications = (await this._storage?.get('notifications')) || [];
    notifications.push(savedNotification);
    await this._storage?.set('notifications', notifications);
  }

  private async initializePushNotifications() {
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        this.notificationReceived.emit(notification); // Emitir evento
        const message = notification.data.message;
        const idUser = notification.data.idUser;
        if (!notification.title) {
          const toast = await this.toastController.create({
            header: 'Nuevo Mensaje',
            message: message,
            position: 'top',
            duration: 4000,
            buttons: [
              {
                text: 'Ver Mensaje',
                handler: () => {
                  this.router.navigate(['chat/' + idUser], {
                    queryParams: { message: message },
                  });
                },
              },
            ],
          });
          await toast.present();
        } else {
          const toast = await this.toastController.create({
            header: notification.title,
            message: message,
            position: 'top',
            duration: 3000,
          });
          await toast.present();
          this.saveNotification(notification);
          if (!Array.isArray(this.notifications)) {
            this.notifications = [];
          }
          this.notifications.unshift(notification);
          this.router.navigate(['folder/notifications']);
        }
      }
    );

    ///
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        if (!notification.notification.title) {
          this.router.navigate(['chat-list']);
        } else {
          this.saveNotification(notification);
          if (!Array.isArray(this.notifications)) {
            this.notifications = [];
          }
          this.notifications.unshift(notification);
          this.router.navigate(['folder/notifications']);
        }
      }
    );
  }
}
