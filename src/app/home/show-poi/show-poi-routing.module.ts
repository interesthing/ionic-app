import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPoiPage } from './show-poi.page';

const routes: Routes = [
  { 
    path: ':id', 
    component: ShowPoiPage 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowPoiPageRoutingModule { }
