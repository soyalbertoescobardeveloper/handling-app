import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailGenericDocumentPageRoutingModule } from './detail-generic-document-routing.module';

import { DetailGenericDocumentPage } from './detail-generic-document.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailGenericDocumentPageRoutingModule
  ],
  declarations: [DetailGenericDocumentPage]
})
export class DetailGenericDocumentPageModule {}
