import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { ListResponse, Poi } from 'src/app/models/poi';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  id: string;
  user: User;
  pois: Array<Poi> = [];
  rating: Array<Rating> = [];

  // rating data
  value: number;
  comment: string;

  constructor(
    private router: Router,
    public http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    const urlUser = `${environment.apiUrl}/users/${this.id}`;
    const url_pois = `${environment.apiUrl}/pois`;
    const urlRating = `${environment.apiUrl}/ratings/?poi=${this.id}`;

    this.http.get<User>(urlUser).subscribe(user => {
      this.user = user;
      console.log(this.user);

      this.http.get<ListResponse<Poi>>(url_pois).subscribe(result => {
        this.pois = result.data.filter(poi => poi.postedBy == this.id)

        this.http.get<Rating[]>(urlRating).subscribe(result => {
          this.rating = result;

          this.rating.forEach(rating => {
            // let urlUser = `${environment.apiUrl}/users/${rating.postedBy}`;
            this.http.get<User>(urlUser).subscribe(user => {
              rating.user = user;

            })
          })
        });
      });
    });



  }

}
