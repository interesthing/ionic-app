import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { defaultIcon } from './default-marker';
import { Map, latLng, marker, Marker, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor(
    private geolocation: Geolocation
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

  ngOnInit() {
    // Geoposition is an interface that describes the position object
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;

      this.mapMarkers = [
        marker([ coords.latitude, coords.longitude ], { icon: defaultIcon }),
      ];

      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

}
