import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController, ToastController } from '@ionic/angular';
import { fileURLToPath } from 'url';
import { Note } from '../model/Note';
import { LocalStorageService } from '../services/LocalStorageService';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public formNota:FormGroup;
  public miLoading:HTMLIonLoadingElement
  public miToast:HTMLIonToastElement
  image:any
  photos:any[]=[]
  latitud: any;
  longitud:any;
  urli:string;

  constructor(private fb:FormBuilder,private noteS:NoteService,private loading:LoadingController,private Toast:ToastController,private storage:LocalStorageService) {
    this.formNota=this.fb.group({
    title:["",Validators.required],
    descripcion:[""]
  });
}


  async presentLoading(){
    const loading= await this.loading.create({
    message:'Adding note...',
    spinner: 'crescent',
    duration: 350
    })
    await loading.present();
  }

  ionViewDidEnter(){
      this.obtenerCoordenadas()
  }

  async presentToast(msg:string,crl:string){
      this.miToast=await this.Toast.create({
        message: msg,
        duration: 2000,
        position: 'bottom',
        color:crl

      });
      this.miToast.present();
  }

  public async addNote(){
      let newNote:Note={
        title: this.formNota.get("title").value,
        descripcion: this.formNota.get("descripcion").value,
        latitud: this.latitud,
        longitud: this.longitud
      }

      try{
      await this.presentLoading();
      let id:string= await this.noteS.addNote(newNote);
      this.miLoading && this.miLoading.dismiss();
      this.formNota.reset();
      await this.presentToast("Note was added successfully","success");
      }catch(err){
        console.log(err);
        this.presentToast("The note was not added, there is a problem","danger")
      }
      
  }

  

async obtenerCoordenadas(){
  const obtenerCoordenada= await Geolocation.getCurrentPosition();
  this.latitud=obtenerCoordenada.coords.latitude;
  this.longitud=obtenerCoordenada.coords.longitude;
  await this.storage.setItem('latitud',this.latitud)
  await this.storage.setItem('longitud',this.longitud)
  
}

}
