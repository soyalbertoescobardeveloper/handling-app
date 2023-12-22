import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GenericDocumentComponent } from './generic-document.component';



@NgModule({
  declarations: [GenericDocumentComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, HttpClientModule
  ],
  exports: [GenericDocumentComponent]
})
export class GenericDocumentModule { }
