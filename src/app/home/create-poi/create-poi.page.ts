import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Poi } from 'src/app/models/poi';
import { QimgResponse} from 'src/app/models/qimg';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';

import { PictureService } from 'src/app/services/picture/picture.service';

interface ResultCall {
  error?: any;
  result?: Poi;
  status: string;
}

@Component({
  selector: 'app-create-poi',
  templateUrl: './create-poi.page.html',
  styleUrls: ['./create-poi.page.scss'],
})

export class CreatePoiPage implements OnInit {
  
  poiData: Poi;
  pictureData: string;
  selectedFile: File;
  picture: QimgResponse;

  constructor(private http: HttpClient,
              private geolocation: Geolocation,
              private auth: AuthService,
              private pictureService: PictureService,
              private router: Router,
    ){
      this.poiData = new Poi();
    }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()["source"]["source"]["_events"][0].token}`
    })
  };
    
  ngOnInit() 
  {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.poiData.pos = {
        coordinates: [
          resp.coords.latitude,
          resp.coords.longitude
        ],
        type: "Point"
      };

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  takePicture(){
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.poiData.photos = [this.picture.url];
      
    }, err => {
      console.warn('Could not take picture', err);
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.poiData.photos = event.target.files[0];
  }

  upload(poi: Poi): void {
    
    const uploadUrl = `${environment.apiUrl}/pois/${this.auth.getUser()["source"]["source"]["_events"][0].user._id}`;

    this.http.post<ResultCall>(uploadUrl, this.poiData, this.httpOptions).subscribe(res => {
      this.router.navigate(["home/show-poi", res["_id"]]);
    });

    
    /*
    const uploadPoiCall = this.http.post<ResultCall>(uploadUrl, this.poiData, this.httpOptions)
      .pipe(
        catchError(error => of({
          error: error,
          type: 'error'
        })
      ));
      
      
      
    const uploadImageCall = this.http.post<ResultCall>(uploadImageUrl, this.pictureData, this.httpQimgOptions).pipe(
      catchError(error => of({
        error: error,
        type: 'error'
      })
    )); 

    
    forkJoin({

      poi: uploadPoiCall,
      image: this.takePicture

    }).subscribe(results => {
      if (results.image.error){
        console.log("Erreurs de l'API de Qimg.");
      }else if(results.poi.error){
        console.log("Erreurs de l'API Intersthing.");
      }else if(results.poi.error && results.image.error){
        console.log("Erreurs de l'API Intersthing et de l'API de Qimg.");
      }else{
        console.log("Votre POI a été créé avec succés.");
      }}) 
    */}

  }

  

