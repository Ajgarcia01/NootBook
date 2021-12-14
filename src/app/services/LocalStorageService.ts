import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

    /*
    *@param value Object
    * returns
    * */
    public async setItem(key:string, value:any):Promise<boolean>{
        let result:boolean = false;
        try{
          await Storage.set({
            key:key,
            value:JSON.stringify(value)
          })
          result=true;
        }catch(err){
          console.error(err);
        }
        
        return Promise.resolve(result);
      }

    


    public async getItem(key:string):Promise<any>{
        let data=null;
      
        try{
            data=await Storage.get({key:key});
            data=data.value
            data=JSON.parse(data)
        }catch(err){
            console.error(err)
        }
        return Promise.resolve(data)
    }

    public async  removeItem(key:string):Promise<boolean>{
        let result:boolean=false;

        try{
         await Storage.remove({key:key})
        }catch(err){
            console.error(err)
        }

        return Promise.resolve(result)
    }


    

}
