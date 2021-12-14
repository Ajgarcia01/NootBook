import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController, IonToggle, MenuController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { BackButtonService } from './services/back-button.service';
import { LocalStorageService } from './services/LocalStorageService';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('mitoogle',{static:false}) mitoogle:IonToggle;
  private langsAvailable=['es','en'];
  private isAndroid=false;
  public image:any
  constructor(private traductor:TranslateService, private storage:LocalStorageService, private authS:AuthService,private platform:Platform,
    private back:BackButtonService,private menu:MenuController,private alert:AlertController,private toast:ToastController) {
    
    (async() =>{
      let lang= await storage.getItem("lang");
      if(lang==null){
        lang=this.traductor.getBrowserLang();
      }else{
        lang=lang.lang;
      }
      console.log("SETEANDO "+lang)
      if(this.langsAvailable.indexOf(lang)>-1){
        traductor.setDefaultLang(lang);
      }else{
        traductor.setDefaultLang('en');
      }
    })();

    traductor.setDefaultLang(window.navigator.language.split("-")[0]);

    this.back.init();
    
    this.openFirst();
  }

  

  async ngOnInit() {
    this.platform.ready().then(async ()=>{
      this.isAndroid=this.platform.is("android");
      if(!this.isAndroid)
        await GoogleAuth.init();
      await this.authS.loadSession();
    })
  }

  async ionViewDidEnter(){
    const lang=this.traductor.getDefaultLang();
    if(lang=='es'){
      this.mitoogle.checked=false;
    }else{
      this.mitoogle.checked=true;
    }
  }

  public async cambiaIdioma(event){
    if(event && event.detail && event.detail.checked){
      await this.storage.setItem('lang',{lang:'en'});
      this.traductor.use('en');
    }else{
      await this.storage.setItem('lang',{lang:'es'});
      this.traductor.use('es');
    }
  }

  public  async openFirst() {
    this.menu.enable(true, 'first');
    await this.menu.open('first');
  }
  public async End() {
    if(this.menu.isOpen){
      await this.menu.close()
    }
    
  }

  public async takeFoto(){
    // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri, // file-based data; provides best performance
    source: CameraSource.Camera, // automatically take a new photo with the camera
    quality: 100 // highest quality (0 to 100)
  });
   
  // Save the picture and add it to photo collection
  await this.savePicture(capturedPhoto);
  
  //this.photos.unshift(savedImageFile);
    this.image=capturedPhoto.webPath;
  }

  private async savePicture(photo: Photo) { 
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.png';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    });
    this.image=photo.webPath;
    
   
    

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
    
}


private async readAsBase64(photo: Photo) {
// Fetch the photo, read as a blob, then convert to base64 format
const response = await fetch(photo.webPath!);
const blob = await response.blob();

return await this.convertBlobToBase64(blob) as string;
}

convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
const reader = new FileReader;
reader.onerror = reject;
reader.onload = () => {
    resolve(reader.result);
};
reader.readAsDataURL(blob);
});
}