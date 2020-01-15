import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    // form validation
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

  // access to form control
  get errorControl() {
    return this.registerForm.controls;
  }

  // was ist los on submit
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

      // todo here -> verify if this userData already exists on heroku
      
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
            // clear inputs
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

  // register() {

  //   const userData = {
  //     "username" : this.username,
  //     "password" : this.password,
  //     "email" : this.email,
  //     "imgProfil" : this.imgProfil
  //   }
    
  //   return this.http.post('http://interesthing.herokuapp.com/users', userData)
  //     .subscribe(data => {
  //       console.log(data['_body']);
  //       if(userData){
  //         this.router.navigateByUrl('/login');
  //         // clear inputs
  //         this.username = "";
  //         this.password = "";
  //         this.email = "";
  //         this.imgProfil = "";
  //       }
  //     }
  //     , error => {
  //       console.log(error);
  //     });
   
  // }

  // getDate(e) {
  //   let date = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.registerForm.get('dob').setValue(date, {
  //      onlyself: true
  //   })
  // }

}
