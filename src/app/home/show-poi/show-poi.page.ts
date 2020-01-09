import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poi } from 'src/app/models/poi';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import {Location} from '@angular/common';
import { StarRating } from 'ionic4-star-rating';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-show-poi',
  templateUrl: './show-poi.page.html',
  styleUrls: ['./show-poi.page.scss'],
})
export class ShowPoiPage implements OnInit {

  id: number;
  poi: Poi;
  rating: Rating[];
  listOpen = false;

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
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    const urlPoi = `${environment.apiUrl}/pois/${this.id}`;
    const urlRating = `${environment.apiUrl}/ratings/?poi=${this.id}`;

    this.http.get<Poi[]>(urlPoi).subscribe(result => {
      this.poi = result[0];  
    });
    this.http.get<Rating[]>(urlRating).subscribe(result => {
      this.rating = result; 
      console.log(this.rating)
      this.rating.forEach(rating => {
        let urlUser = `${environment.apiUrl}/users/${rating.postedBy}`; 
        this.http.get<User>(urlUser).subscribe(user => {
          rating.user = user;
          console.log(rating)
        })
      })
    });
    
}

}
