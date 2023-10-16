import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DetailCrewRoutingModule } from './detail-crew-routing.module';
import { DetailCrewComponent } from './detail-crew.component';



@NgModule({
  declarations: [DetailCrewComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, DetailCrewRoutingModule
  ]
})
export class DetailCrewModule { }
