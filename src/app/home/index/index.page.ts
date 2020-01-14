import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

import { ChildActivationStart } from '@angular/router';
import { Poi, ListResponse, Username } from 'src/app/models/poi';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { WebsocketService } from 'src/websocket/websocket.service';
import { User } from 'src/app/models/user';
import { Rating } from 'src/app/models/rating';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  changeColor = false;

  pois: Array<Poi> = [];
  city: string;
  users: Array<User>;
  ratings: Array<Rating> = [];
  message: object;

  constructor(
    private auth: AuthService,

    private router: Router,

    // TODO: inject the HTTP client.
    public http: HttpClient,
    private wsService: WebsocketService
    
  )
  {
    this.wsService
    .listen()
    .subscribe((message: any) => {
      this.wsShow(JSON.parse(message));
    });
  }

  wsShow(message) {
    this.message = message;
  }

  onSelect(Poi) {
    this.router.navigate(['home/show-poi', Poi._id]);
  }

  ngOnInit() {
    const urlPoi = `${environment.apiUrl}/pois`;
    const urlUser = `${environment.apiUrl}/users`;
    const urlRating = `${environment.apiUrl}/ratings`;

    this.http.get<ListResponse<Poi>>(urlPoi).subscribe(result => {
      this.pois = result.data;
      this.pois.forEach(poi =>
        this.http
          .get(`${environment.geocodeApi}/geocode/v1/json?q=${poi.pos.coordinates[0]}+${poi.pos.coordinates[1]}&key=5089bd06f21940b4a2978b98ee653f58`)
          .subscribe((address: any) => {
           this.city = address.results[0].components.city_district;
           poi.city = this.city;
          })
      );
        this.http.get<User[]>(urlUser).subscribe(user => {
          this.users = user;  
          
            this.http.get<Rating[]>(urlRating).subscribe(rating => {
              this.ratings = rating;  
              this.message = {
                "TotalUser": this.users.length,
                "TotalPoi": this.pois.length,
                "TotalRating": this.ratings.length
              }
              console.log(this.message)
              this.wsShow(this.message);

            });
        });
    });
  }

  filter(param) {
    
  }

  redirectToPoiForm(){
    this.router.navigateByUrl('home/create-poi');
  }

  redirectToMap(){
    this.router.navigateByUrl('home/map');
  }
}
