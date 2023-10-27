import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InvoiceUploadComponent } from './invoice-upload.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [InvoiceUploadComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, HttpClientModule
  ],
  exports: [InvoiceUploadComponent]
})
export class InvoiceUploadModule { }
