import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { LocalStorageService } from './LocalStorageService';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:any;
  public pass:string;
  private isAndroid=false;

  constructor(private storage:LocalStorageService,private afa:AngularFireAuth) {
  
   }

  public isLogged():boolean{
    if(this.user) return true; else return false;
  }

  public async loadSession(){
    try {
      let user= await this.storage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.user=user;
      }
    } catch (error) {
      console.log("Error al cargar ---> "+error);
    }
  }

  public async login(){
    let user:User = await GoogleAuth.signIn();
    this.user=user;
    await this.keepSession();
  }
  public async logout(){
    await GoogleAuth.signOut();
    await this.storage.removeItem('user');
    this.user=null;
  }
  public async keepSession(){
    await this.storage.setItem('user',JSON.stringify(this.user));
  }

  public async loginwithEmail(email:string,password:string){
    try {
      const {user} = await this.afa.signInWithEmailAndPassword(email,password);
      this.user=user;
      await this.keepSession();
    } catch (error) {
      console.log("Error al iniciar sesion ---> "+error);
    }
  }

  public async register(email:string,password:string){
    try {
      const {user} = await this.afa.createUserWithEmailAndPassword(email,password);
      return user;
    } catch (error) {
      console.log("Error al registrar usuario ---> "+error);
    }
  }
}
