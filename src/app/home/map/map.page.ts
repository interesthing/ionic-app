import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Map, latLng, marker, Marker, MapOptions, tileLayer } from 'leaflet';
import { Poi, ListResponse, Username } from 'src/app/models/poi';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { defaultIcon, userIcon } from 'src/icon/defaultIcon'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  mapOptions: MapOptions;
  mapMarkers: Marker[] = [];
  pois: Array<Poi> = [];
  



  constructor(
    private geolocation: Geolocation,
    public http: HttpClient,
    private router: Router,
    private location: Location
  ) { 

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  onSelect(Poi) {
    this.router.navigate(['home/show-poi', Poi._id]);
  }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    // Geoposition is an interface that describes the position object
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;

      this.mapMarkers.push(marker([ coords.latitude, coords.longitude ], { icon: userIcon }).bindPopup('<h6>Votre position actuelle</h6>', { offset: [0, -45] }));

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });

    const url = `${environment.apiUrl}/pois`;
    this.http.get<ListResponse<Poi>>(url).subscribe(result => {
      result.data.forEach(poi => {
        this.mapMarkers.push(marker([poi.pos.coordinates[0], poi.pos.coordinates[1]], { icon: defaultIcon }).bindPopup(
          `<h6>${poi.title}</h6>
          <ionic4-star-rating #rating activeIcon="ios-star" defaultIcon="ios-star-outline" activeColor="#5173ba"
          defaultColor="#5173ba" readonly="true" rating="${poi.averageRating}" fontSize="14px">
          </ionic4-star-rating>
          <p>${poi.categorie}</p>
          <a href="home/show-poi/${poi._id}">Voir le POI</a>
          `
          , 
          { offset: [0, -45] }));
      });
    });
  }

}
