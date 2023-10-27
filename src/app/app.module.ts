import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalCommentModule } from './modal-comment/modal-comment.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { GenericModalModule } from './generic-modal/generic-modal.module';
import { InvoiceUploadModule } from './invoice-upload/invoice-upload.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ModalCommentModule, IonicStorageModule.forRoot(), GenericModalModule, InvoiceUploadModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
