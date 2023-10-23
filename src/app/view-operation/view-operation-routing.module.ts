import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewOperationComponent } from './view-operation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const routes: Routes = [{
  path: '',
  component: ViewOperationComponent
}]

@NgModule({
  declarations: [],
  imports: [
   FormsModule, CommonModule, RouterModule.forChild(routes),  HttpClientModule
  ],
  exports: [RouterModule]
})
export class ViewOperationRoutingModule { }
