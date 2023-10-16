import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCommentComponent } from './modal-comment.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [ModalCommentComponent],
  imports: [
    FormsModule,
    IonicModule,
    HttpClientModule,
  ]
})
export class ModalCommentModule { }
