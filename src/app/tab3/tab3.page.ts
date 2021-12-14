import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm/user';
import { IonToggle } from '@ionic/angular';
import {TranslateService } from '@ngx-translate/core';
import { google } from 'google-maps';
import { Map, tileLayer, TileLayer } from 'leaflet';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/LocalStorageService';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('mitoogle',{static:false}) mitoogle:IonToggle;
  public photos:any[]=[];
  public image:any;
  public user:User
  latitud:number
  longitud:number

  constructor(private traductor:TranslateService,private storage:LocalStorageService,private authS:AuthService) {

  }
  ngOnInit(): void {
   
  }
  
  ionViewDidEnter(){
   
  }

  public logout(){
    return this.authS.logout();
    
  }

  

}
