import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message.component';



@NgModule({
  declarations: [MessageComponent],
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, HttpClientModule],
  exports: [MessageComponent],
})
export class MessageModule { }
