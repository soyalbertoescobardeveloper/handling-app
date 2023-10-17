import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss'],
})
export class GenericModalComponent {
  @Input() title!: string;
  @Input() message!: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }

}
