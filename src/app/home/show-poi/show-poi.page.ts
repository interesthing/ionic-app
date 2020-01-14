import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poi } from 'src/app/models/poi';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from '@angular/common';
import { StarRating } from 'ionic4-star-rating';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, latLng, marker, Marker, MapOptions, tileLayer } from 'leaflet';
import { defaultIcon } from 'src/icon/defaultIcon';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-show-poi',
  templateUrl: './show-poi.page.html',
  styleUrls: ['./show-poi.page.scss'],
})
export class ShowPoiPage implements OnInit {

  user: Array<User> = [];

  id: string;
  poi: Poi;
  rating: Rating[];
  listOpen = false;
  city: string;

  // rating data
  value: number;
  comment: string;

  mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    public http: HttpClient,
    private router: Router,
    private location: Location,
    private geolocation: Geolocation,
    public alertController: AlertController
  ) {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 9,
      center: latLng(46.778186, 6.641524)
    };
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()["source"]["source"]["_events"][0].token}`
    })
  };

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const urlPoi = `${environment.apiUrl}/pois/${this.id}`;
    const urlRating = `${environment.apiUrl}/ratings/?poi=${this.id}`;

    this.http.get<Poi[]>(urlPoi).subscribe(result => {
      this.poi = result[0];

      this.http
      .get(`${environment.geocodeApi}/geocode/v1/json?q=${this.poi.pos.coordinates[0]}+${this.poi.pos.coordinates[1]}&key=5089bd06f21940b4a2978b98ee653f58`)
      .subscribe((address: any) => {
       this.city = address.results[0].formatted;
       this.poi.city = this.city;

      })

      this.mapMarkers = [
        marker([this.poi.pos.coordinates[0], this.poi.pos.coordinates[1]], { icon: defaultIcon }),
      ];
      this.mapOptions.center = latLng(this.poi.pos.coordinates[0], this.poi.pos.coordinates[1]);
    });

    this.http.get<Rating[]>(urlRating).subscribe(result => {
      this.rating = result;
      this.rating.forEach(rating => {
        let urlUser = `${environment.apiUrl}/users/${rating.postedBy}`;
        this.http.get<User>(urlUser).subscribe(user => {
          rating.user = user;
        })
      })
    });
  }

  usernameSelect(UserId) {
    this.router.navigate(['home/person', UserId._id]);
    console.log(UserId);
  }
  
  async ratePrompt() {
    const alert = await this.alertController.create({
      header: 'Laisser un avis',
      inputs: [
        {
          name:'Note',
          type: 'number',
          placeholder: 'La note ici',
          min: 1,
          max: 5
        },
        {
          name: 'Commentaire',
          type: 'text',
          placeholder: 'Commentaire ici'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Cancel confirmed');
          }
        },
        {
          text: 'Laisser',
          handler: data => {
            const rateData = {
              "poi": this.id,
              "value" : data.Note,
              "comment" : data.Commentaire,
            }
            const uploadUrl = `${environment.apiUrl}/ratings/${this.auth.getUser()["source"]["source"]["_events"][0].user._id}`;
            return this.http.post(uploadUrl, rateData, this.httpOptions)
              .subscribe(rateData => {
                console.log(rateData['_body']);
              }
              , error => {
                console.log(error);
              });
          }
        }
      ]
    });
    await alert.present();
  }

}
