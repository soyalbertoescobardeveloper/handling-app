import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailGenericDocumentPage } from './detail-generic-document.page';

const routes: Routes = [
  {
    path: '',
    component: DetailGenericDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailGenericDocumentPageRoutingModule {}
