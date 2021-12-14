import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, ToastController } from '@ionic/angular';
import { Note } from 'src/app/model/Note';
import { LocalStorageService } from 'src/app/services/LocalStorageService';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.page.html',
  styleUrls: ['./editnote.page.scss'],
})
export class EditnotePage implements OnInit {
  @Input() note: Note;
  //note:Note
  notes:Note[]=[];
  public formNota:FormGroup;
  latitud: any;
  longitud: any;
  constructor(public modalController:ModalController,private ns:NoteService,private fb:FormBuilder,
    private toast:ToastController,private storage:LocalStorageService,private router:Router) {
    this.formNota=this.fb.group({
      title:["",Validators.required],
      descripcion:[""]
    });
   
   }


   ionViewDidEnter(){
    this.note
    this.formNota=this.fb.group({
      title:[this.note.title,Validators.required],
      descripcion:[this.note.descripcion]
    });;
    
  }

  async ngOnInit() {
    await this.obtenerCoordenadas();
  }

  public async editNote(){

     let nuevanota:Note={
       title: this.formNota.get("title").value,
       descripcion: this.formNota.get("descripcion").value,
       latitud: this.latitud,
       longitud: this.longitud
     }
    try{
    await this.ns.edit(this.note.key,nuevanota);
    await this.presentToast('Nota editada con exito','success','middle');
    await this.modalController.dismiss();
    
    
    }catch(err){
      console.log(err);
  }  
 }


 async presentToast(msg:string,clr:string,pos:any) {
  const miToast = await this.toast.create({
    message: msg,
    duration: 2000,
    position:pos,
    color:clr
  });
  miToast.present();
 }

 async obtenerCoordenadas(){
  const obtenerCoordenada= await Geolocation.getCurrentPosition();
  this.latitud=obtenerCoordenada.coords.latitude;
  this.longitud=obtenerCoordenada.coords.longitude;
  await this.storage.setItem('latitud',this.latitud)
  await this.storage.setItem('longitud',this.longitud)
  
}

exit(){
  this.modalController.dismiss();
}

}
