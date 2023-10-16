import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { DetailPaxComponent } from './detail-pax.component';

const routes: Routes = [
  {
    path: '',
    component: DetailPaxComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DetailPaxRoutingModule { }
