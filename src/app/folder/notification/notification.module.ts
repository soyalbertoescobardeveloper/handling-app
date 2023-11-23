import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, HttpClientModule
  ],
  declarations: [NotificationComponent], 
  exports: [NotificationComponent]
})
export class NotificationModule { }

