import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { StarRatingModule } from 'ionic4-star-rating';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    IndexPageRoutingModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
