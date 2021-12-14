import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authS:AuthService,private router:Router) { }

  ngOnInit() {
  }

  public async registerUser(email,password){
    try{
    const user = await this.authS.register(email.value,password.value);
    if(user){
      console.log(user);
      this.router.navigate(['']);
      await this.authS.keepSession();

    }
    }catch(error){
      console.log(error);
    }
  }

}
