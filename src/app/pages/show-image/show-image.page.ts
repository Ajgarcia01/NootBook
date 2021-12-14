import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, ModalController } from '@ionic/angular';
import { tileLayer, Map, marker } from 'leaflet';
import { Note } from 'src/app/model/Note';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.page.html',
  styleUrls: ['./show-image.page.scss'],
})
export class ShowImagePage implements OnInit {
  @Input() note: Note;
  image:any;
  images:any[]=[]
  constructor(public modalController:ModalController,public loading:LoadingController) { }

  async ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.hello();
  }

  public hello(){
    var map = new Map('map').setView([this.note.latitud, this.note.longitud], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

   const ma=marker([this.note.latitud, this.note.longitud]).addTo(map).bindPopup(this.note.descripcion); 
    map.fitBounds([
      [ma.getLatLng().lat,ma.getLatLng().lng]
    ]);
  }

  exit(){
    this.modalController.dismiss();
  }

  

}
