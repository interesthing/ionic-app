import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'pois',
        loadChildren: () => import('./pois/pois.module').then( m => m.PoisPageModule)
      },    
      {
        path: 'create-poi',
        loadChildren: () => import('./create-poi/create-poi.module').then(m => m.CreatePoiPageModule)
      },
      {
        path: 'show-poi',
        loadChildren: () => import('./show-poi/show-poi.module').then( m => m.ShowPoiPageModule)
      },
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then( m => m.PersonPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
