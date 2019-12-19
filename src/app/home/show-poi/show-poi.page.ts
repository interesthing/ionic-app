import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poi } from 'src/app/models/poi';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-poi',
  templateUrl: './show-poi.page.html',
  styleUrls: ['./show-poi.page.scss'],
})
export class ShowPoiPage implements OnInit {

  id: number;
  private sub: any;
  poi: Poi;


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    public http: HttpClient,
    private location: Location
    ) { }

    backClicked() {
      this.location.back();
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const url = `${environment.apiUrl}/pois/${this.id}`;
    this.http.get<Poi[]>(url).subscribe(result => {
      this.poi = result[0];  
      console.log(this.poi)
    });
}

}
