import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowPoiPageRoutingModule } from './show-poi-routing.module';
import { ShowPoiPage } from './show-poi.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    LeafletModule,
    ShowPoiPageRoutingModule
  ],
  declarations: [ShowPoiPage]
})
export class ShowPoiPageModule {}
