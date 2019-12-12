import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    private auth: AuthService,
    // TODO: inject the HTTP client.
    public http: HttpClient
  ){}

  ionViewDidLoad() {
    // TODO: make an HTTP request to retrieve the trips.
    const url = 'https://interesthing.herokuapp.com/pois';
    this.http.get(url).subscribe(pois => {
      console.log(`POI loaded`, pois);
    });
  }

  ngOnInit() {
  }

}
