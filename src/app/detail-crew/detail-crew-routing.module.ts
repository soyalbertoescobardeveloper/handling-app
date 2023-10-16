import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailCrewComponent } from './detail-crew.component';


const routes: Routes = [
  {
    path: '',
    component: DetailCrewComponent
  }
]


@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DetailCrewRoutingModule { }
