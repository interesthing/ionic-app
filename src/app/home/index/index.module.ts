import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { WebsocketService } from 'src/websocket/websocket.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    StarRatingModule,
    IndexPageRoutingModule
  ],
  declarations: [IndexPage],
  // à voir avec Mathias
  providers: [WebsocketService]
})
export class IndexPageModule {}
