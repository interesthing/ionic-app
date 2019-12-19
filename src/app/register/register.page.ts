import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {}

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
      }, error => {
        console.log(error);
      });
   
  }

}
