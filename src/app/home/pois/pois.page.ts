import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Poi, ListResponse } from 'src/app/models/poi';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pois',
  templateUrl: './pois.page.html',
  styleUrls: ['./pois.page.scss'],
})
export class PoisPage implements OnInit {

  pois: Array<Poi>;
  value: number;
  city: string;
  categorie: string;

  constructor(
    private location: Location,
    public http: HttpClient,
    private router: Router,
  ) { }

  backClicked() {
    this.location.back();
  }

  onSelect(Poi) {
    this.router.navigate(['home/show-poi', Poi._id]);
  }

  reset() {
    this.ngOnInit();
  }

  filterRating(event) {
    this.value = event.target.value;
    this.filter();
  }

  filterCategory(event) {
    this.categorie = event.target.value;
    this.filter();
  }

  filter() {
    const url = `${environment.apiUrl}/pois`;
    this.http.get<ListResponse<Poi>>(url).subscribe(result => {
      this.pois = result.data.filter(poi => this.applyFilter(poi));
    });
  }

  applyFilter(poi: Poi): boolean {
    const ratingFilter = this.value ? Math.round(poi.averageRating) == this.value : true;
    const categoryFilter = this.categorie ? poi.categorie === this.categorie : true;
    return ratingFilter && categoryFilter;
  }

  ngOnInit() {
    const url = `${environment.apiUrl}/pois`;
    this.http.get<ListResponse<Poi>>(url).subscribe(result => {
      this.pois = result.data;
      this.pois.forEach(poi =>
        this.http
          .get(`${environment.geocodeApi}/geocode/v1/json?q=${poi.pos.coordinates[0]}+${poi.pos.coordinates[1]}&key=5089bd06f21940b4a2978b98ee653f58`)
          .subscribe((address: any) => {
           this.city = address.results[0].components.city_district;
           poi.city = this.city;
          })
      );
    });
    
  }

}
