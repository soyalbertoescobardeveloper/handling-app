import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HelpComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RouterModule, HttpClientModule
  ],
  exports: [HelpComponent]
})
export class HelpModule { }
