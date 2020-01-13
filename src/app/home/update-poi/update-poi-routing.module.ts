import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePoiPage } from './update-poi.page';

const routes: Routes = [
  {
    path: ':id',
    component: UpdatePoiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePoiPageRoutingModule {}
