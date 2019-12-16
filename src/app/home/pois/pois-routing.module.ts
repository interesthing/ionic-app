import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoisPage } from './pois.page';

const routes: Routes = [
  {
    path: '',
    component: PoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoisPageRoutingModule {}
