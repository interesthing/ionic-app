import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoisPageRoutingModule } from './pois-routing.module';

import { PoisPage } from './pois.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoisPageRoutingModule,
    StarRatingModule
  ],
  declarations: [PoisPage]
})
export class PoisPageModule {}
