import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Poi, ListResponse } from 'src/app/models/poi';
import { Rating, RatingList} from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})

export class ProfilPage implements OnInit {

  pois: Array<Poi> = [];
  ratings: Array<Rating> = [];
  user: Array<User> = [];
  userId: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    public http: HttpClient,
    public alertController: AlertController
  ){}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()["source"]["source"]["_events"][0].token}`
    })
  };

  ngOnInit() {
    const url_pois = `${environment.apiUrl}/pois`;
    const url_ratings = `${environment.apiUrl}/ratings`;
    this.userId = this.auth.getUser()["source"]["source"]["_events"][0].user._id;
    this.user = this.auth.getUser()["source"]["source"]["_events"][0].user.username;

    this.http.get<ListResponse<Poi>>(url_pois).subscribe(result => {
      this.pois = result.data.filter(poi => poi.postedBy == this.userId);
    });

    this.http.get<RatingList<Rating>>(url_ratings).subscribe(result => {
      this.ratings = result.filter(rating => rating.postedBy == this.userId);
    });
    
  }

  redirectToUpdateForm(Poi){
    this.router.navigate(["home/update-poi", Poi._id]);
  }

  onSelect(Poi) {
    this.router.navigate(['home/show-poi', Poi._id]);
  }

  async deletePoi(Poi) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: "Êtes vous sûr-e de vouloir supprimer : \"" + Poi.title +"\" ?",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Cancel confirmed');
          }
        },
        {
          text: 'Supprimer',
          handler: data => {
            const deleteImgUrl = `${environment.qimgUrl}/images/${Poi.photos[1]}`;
            const deletePoiUrl = `${environment.apiUrl}/pois/${Poi._id}`;

            const requestOptions = {
              headers: {
                Authorization: `Bearer ${environment.qimgSecret}`
              }
            };
            
            this.http.delete(deleteImgUrl, requestOptions).subscribe(res => { console.log(res)});
            this.http.delete(deletePoiUrl, this.httpOptions).subscribe(res => { console.log(res); this.ngOnInit();});
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteRating(Rating){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: "Êtes vous sûr-e de vouloir supprimer : \"" + Rating.comment +"\" ?",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Cancel confirmed');
          }
        },
        {
          text: 'Supprimer',
          handler: data => {

            const deleteRatingUrl = `${environment.apiUrl}/ratings/${Rating._id}`;
            console.log(deleteRatingUrl);

            const requestOptions = {
              headers: {
                Authorization: `Bearer ${environment.qimgSecret}`
              }
            };
            
            this.http.delete(deleteRatingUrl, this.httpOptions).subscribe(res => { console.log(res); this.ngOnInit();});
          }
        }
      ]
    });
    await alert.present();
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
