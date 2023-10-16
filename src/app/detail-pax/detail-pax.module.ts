import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailPaxRoutingModule } from './detail-pax-routing.module';
import { DetailPaxComponent } from './detail-pax.component';



@NgModule({
  declarations: [DetailPaxComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, DetailPaxRoutingModule
  ]
})
export class DetailPaxModule { }
