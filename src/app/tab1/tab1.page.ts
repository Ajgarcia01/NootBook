import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
import { AlertController, IonInfiniteScroll, IonItemSliding, IonRefresher, IonSearchbar, LoadingController, MenuController, ModalController,ToastController } from '@ionic/angular';
import { EditnotePage } from '../pages/editnote/editnote.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Note } from '../model/Note';
import { ShowImagePage } from '../pages/show-image/show-image.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonInfiniteScroll) infinite:IonInfiniteScroll;
  @ViewChild('search', { static: false }) search: IonSearchbar;
  @ViewChild('slidingItem',{ static: false }) slidingItem:IonItemSliding;


  notes:Note[]=[];  miLoading:HTMLIonLoadingElement
  protected searchedItem: any;
  public list: Array<Object>=[]
  refresh:IonRefresher
  constructor(private ns:NoteService,public alert:AlertController,private loading:LoadingController,
    private toast:ToastController,private router:Router,public modalController:ModalController,
    private authS:AuthService,private menu:MenuController) 
    {
      this.searchedItem=this.notes
    }

  ngOnInit(): void {
    this.presentToast('Bienvenido a NOTEA','primary','middle')
  }

  async ionViewDidEnter(){
    
    await this.getNotas();
    this.searchedItem=this.notes
    
  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.notes;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: Note) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
 
  public async getNotas(event?){
    if(this.infinite){
      this.infinite.disabled=false;
    }
    if(!event){
      await this.presentLoading();
    }
    this.notes=[];
    try{
      this.notes=await this.ns.getNotesByPage('algo').toPromise();
    }catch(err){
      console.error(err);
      await this.presentToast("Error cargando datos","danger",'bottom');
    } finally{
      if(event){
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
    }
  }
    public async borra(note:Note){
      
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Atencion', 
        subHeader: 'Borrado de nota',
        message: '¿Está seguro de borrar tu nota '+ note.title +'?',
        buttons: [ {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
            await this.miLoading.dismiss();
           
            
          }
          
        }, {
          text: 'Aceptar',
          handler: async () => {
          
            await this.ns.remove(note.key);
            
            let i = this.notes.indexOf(note,0);
            if(i>-1){
              this.notes.splice(i,1);
            }
            
            await this.presentToast('Nota eliminada con exito','success','bottom');
            await this.getNotas();



          }
        }]
      });
      
      await alert.present();
    }


    async presentLoading() {
      this.miLoading = await this.loading.create({
        message: ''
      });
      await this.miLoading.present();
    }

    async presentToast(msg:string,clr:string,pos:any) {
      const miToast = await this.toast.create({
        message: msg,
        duration: 1350,
        position:pos,
        color:clr
      });
      miToast.present();
    }

    async openModal(note:Note){
      const modal = await this.modalController.create({
        component: EditnotePage,
        componentProps: {
          'note': note
        }
      });
      this.closeSliding();
      return await modal.present();
    }

    async openModalImage(note:Note){
      const modal = await this.modalController.create({
        component: ShowImagePage,
        componentProps: {
          'note': note
        }
      });
      this.closeSliding();
      return await modal.present();
      
    }


  public async cargaInfinita($event){
    console.log("CARGAND");
    let nuevasNotas=await this.ns.getNotesByPage().toPromise();
    if(nuevasNotas.length<20){
      $event.target.disabled=true;
    }
    this.notes=this.notes.concat(nuevasNotas);
    $event.target.complete(); 
  }
 

  public async logout(){
      
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atencion', 
      subHeader: 'Cierre de Sesión',
      message: '¿Está seguro de que quiere salir?',
      buttons: [ {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
          await this.miLoading.dismiss();
         
          
        }
        
      }, {
        text: 'Aceptar',
        handler: async () => {
          try{
            await this.authS.logout();
            this.router.navigate(['']);
            console.log("usuario logout");
            this.presentToast('Esperamos verte pronto, un saludo','primary','top')
            
          }catch(err) {
            console.log(err);
            
          }}
      }]
    });
    
    await alert.present();
  }

  public closeSliding(){
    return this.slidingItem.closeOpened();
  }


}


