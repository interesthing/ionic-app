import { Component, OnInit } from '@angular/core';
import { Poi } from 'src/app/models/poi';
import { QimgResponse } from 'src/app/models/qimg';
import { Router, ActivatedRoute } from '@angular/router';
import { PictureService } from 'src/app/services/picture/picture.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-poi',
  templateUrl: './update-poi.page.html',
  styleUrls: ['./update-poi.page.scss'],
})
export class UpdatePoiPage implements OnInit {

  id: string;
  poiData: Poi;
  picture: QimgResponse;
  currentImgUrl: string;
  currentImgId: string;

  constructor(private pictureService: PictureService,
              private router: Router,
              public http: HttpClient,
              private route: ActivatedRoute,
              private auth: AuthService)
              {
    this.poiData = new Poi();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()["source"]["source"]["_events"][0].token}`
    })
  };

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    const urlPoi = `${environment.apiUrl}/pois/${this.id}`;

    this.http.get<Poi>(urlPoi).subscribe(result => {
        this.poiData = result[0];
        this.currentImgUrl= this.poiData.photos[0];
        this.currentImgId = this.poiData.photos[1];
      })
  }

  takePicture(){

    const deleteUrl = `${environment.qimgUrl}/images/${this.currentImgId}`;
    
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${environment.qimgSecret}`
      }
    };

    this.http.delete(deleteUrl, requestOptions).subscribe(res => { console.log(res)});
    
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.poiData.photos = [this.picture.url, this.picture.id];
      this.currentImgUrl = this.poiData.photos[0];
      
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  updatePoiForm(poiForm: NgForm) :void{

    const updateUrl = `${environment.apiUrl}/pois/${this.poiData._id}`;
    
    const patchObject = {
         "photos": this.poiData.photos,
         "title": this.poiData.title,
         "description": this.poiData.description,
         "categorie": this.poiData.categorie}

    this.http.patch(updateUrl, patchObject, this.httpOptions).subscribe(res => {
      this.router.navigate(["home/show-poi", res["_id"]]);
    });
  }
}
