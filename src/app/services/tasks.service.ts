import { Injectable } from '@angular/core';
import { Lista } from "../models/lista.model";
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  listas:Lista[]=[];

  constructor() {
    this.loadStorage();



   }

   crearLista(item:string){

    const list = new Lista(item);
    this.listas.push(list);
    this.saveStorage();
    return list.id;
   
   }
   getList(id:number|string){
     id=Number(id);

     return this.listas.find(listaData=>listaData.id===id);

   }


  deleteList(list:Lista){

    this.listas=this.listas.filter(data=>data.id!==list.id);
    this.saveStorage();
  }


   saveStorage(){
       localStorage.setItem('lista',JSON.stringify(this.listas))
   }
   loadStorage(){

    if(localStorage.getItem('lista')){
      this.listas=JSON.parse(localStorage.getItem('lista'))
    }
else{
  this.listas=[];
}
   }
}
