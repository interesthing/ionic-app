import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePoiPage } from './create-poi.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePoiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePoiPageRoutingModule {}
