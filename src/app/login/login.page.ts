import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo:User;

  constructor(private authS:AuthService,private router:Router) {
  
  }
  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      this.router.navigate(['private/tabs/tab1']);
    }
  }
  public async signin() {
    try {
      await this.authS.login();
      this.router.navigate(['private/tabs/tab1']);
    } catch (err) {
      console.error(err);
    }
  }

  public async logIn(email, password) {
    await this.authS.loginwithEmail(email.value, password.value);  
    console.log(this.authS.isLogged());
    this.router.navigate(['private/tabs/tab1']);
  }
  
  public recovery(){
    this.router.navigate(['/recovery']);
  }
  public register(){
    this.router.navigate(['/register']);
  }

  }

