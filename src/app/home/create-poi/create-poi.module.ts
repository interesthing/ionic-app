import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePoiPageRoutingModule } from './create-poi-routing.module';

import { CreatePoiPage } from './create-poi.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePoiPageRoutingModule
  ],
  providers:[
    Geolocation
  ],
  declarations: [CreatePoiPage]
})
export class CreatePoiPageModule {}
