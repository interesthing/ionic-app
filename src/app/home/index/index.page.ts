import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

import { ChildActivationStart } from '@angular/router';
import { Poi, ListResponse, Username } from 'src/app/models/poi';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  pois: Array<Poi> = [];

  constructor(
    private auth: AuthService,

    private router: Router,

    // TODO: inject the HTTP client.
    public http: HttpClient,
    
  ){}

  onSelect(Poi) {
    this.router.navigate(['home/show-poi', Poi._id]);
  }

  ngOnInit() {
    const url = `${environment.apiUrl}/pois`;
    this.http.get<ListResponse<Poi>>(url).subscribe(result => {
      this.pois = result.data;   
    });
  }

  redirectToPoiForm(){
    this.router.navigateByUrl('home/create-poi');
  }

  redirectToMap(){
    this.router.navigateByUrl('home/map');
  }
}
