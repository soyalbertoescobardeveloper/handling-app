import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.scss'],
})
export class InvoiceUploadComponent  implements OnInit {
  modal: HTMLIonModalElement | null = null;
  @Input() isModal: boolean = false;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModals() {
    if (this.isModal) return;
  
    this.modal = await this.modalController.create({
      component: InvoiceUploadComponent,
      componentProps: {
        isModal: true
      }
    });
    await this.modal.present();
  }

  async dismiss() {
    if (this.modal) {
      await this.modal.dismiss();
      this.modal = null;
      this.modal = null;
    } else {
      this.modal = null;
    }
  }

  submit() {

  }
  

}
