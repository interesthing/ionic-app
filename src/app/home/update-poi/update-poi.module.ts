import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePoiPageRoutingModule } from './update-poi-routing.module';

import { UpdatePoiPage } from './update-poi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePoiPageRoutingModule
  ],
  declarations: [UpdatePoiPage]
})
export class UpdatePoiPageModule {}
