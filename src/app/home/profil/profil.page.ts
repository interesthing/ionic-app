import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Poi, ListResponse } from 'src/app/models/poi';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})

export class ProfilPage implements OnInit {

  pois: Array<Poi> = [];
  user: Array<User> = [];
  userId: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    public http: HttpClient
  ) { }

  ngOnInit() {
    const url_pois = `${environment.apiUrl}/pois`;

    this.http.get<ListResponse<Poi>>(url_pois).subscribe(result => {
      this.userId = this.auth.getUser()["source"]["source"]["_events"][0].user._id;
      this.pois = result.data.filter(poi => poi.postedBy == this.userId)
    });

    this.user = this.auth.getUser()["source"]["source"]["_events"][0].user.username;
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
