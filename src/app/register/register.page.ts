import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username: string;
  password: string;
  email: string;
  imgProfil: string;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router
  ) {}

  async registerAlert() {
    const alert = await this.alertController.create({
      header: 'Merci pour ton inscription, ' + this.username,
      subHeader: 'Ton compte a été créé avec succès !',
      message: 'Comme disait Philippe Chavanis, Il est temps de se connecter à des choses intéressantes',
      buttons: ['Ok']
    })

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() {
  }

  register() {

    const userData = {
      "username" : this.username,
      "password" : this.password,
      "email" : this.email,
      "imgProfil" : this.imgProfil
    }
    
    return this.http.post('http://interesthing.herokuapp.com/users', userData)
      .subscribe(data => {
        console.log(data['_body']);
        if(userData){
          this.router.navigateByUrl('/login');
          // clear inputs
          this.username = "";
          this.password = "";
          this.email = "";
          this.imgProfil = "";
        }
      }
      , error => {
        console.log(error);
      });
   
  }

}
