import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])],
      imgProfil: ['']
    })
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Veuillez renseigner tous les champs')
      return false;
    } else {
      console.log(this.registerForm.value)
      
      const userData = {
        "username" : this.registerForm.value.username,
        "password" : this.registerForm.value.password,
        "email" : this.registerForm.value.email,
        "imgProfil" : this.registerForm.value.imgProfil
      }
      
      return this.http.post('http://interesthing.herokuapp.com/users', userData)
        .subscribe(async data => {
          console.log(data['_body']);
          if(userData){
            const alert = await this.alertController.create({
              cssClass:'register-alert',
              header: 'Bienvenue parmi nous,' + this.registerForm.value.username,
              subHeader: 'Ton compte a été créé avec succès !',
              message: 'Comme disait Philippe Chavanis: <br /><br /><i>Il est temps de se connecter à des choses intéressantes</i>',
              buttons: [
                {
                  text: 'Ok',
                  cssClass: 'tertiary',
                }
              ]
            })
            await alert.present();
            let result = await alert.onDidDismiss();
            console.log(result);
            this.router.navigateByUrl('/login');
            this.username = "";
            this.password = "";
            this.email = "";
            this.imgProfil = "";
          }
        }, 
        error => {
          console.log(error);
        });

    }
  }

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

}
