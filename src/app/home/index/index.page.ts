import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    private auth: AuthService,

    private router: Router,

    // TODO: inject the HTTP client.
    public http: HttpClient
  ){}

  ngOnInit() {
      // TODO: make an HTTP request to retrieve the trips.
      const url = `${environment.apiUrl}/pois`;
      this.http.get(url).subscribe(pois => {
        console.log(`POI loaded`, pois);
      });
  }

  redirectToPoiForm(){
    this.router.navigateByUrl('home/create-poi');
  }

  redirectToMap(){
    this.router.navigateByUrl('home/map');
  }
}
