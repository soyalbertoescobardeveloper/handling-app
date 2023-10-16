import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ViewOperationRoutingModule } from './view-operation-routing.module';
import { ViewOperationComponent } from './view-operation.component';



@NgModule({
  declarations: [ViewOperationComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, ViewOperationRoutingModule,
    HttpClientModule
  ]
})
export class ViewOperationModule { }
