import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Lista } from "../../models/lista.model";
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  list:Lista[]=[];
  constructor(public taskService:TasksService, private router:Router,public alertController: AlertController) {
  

  }
 async agregarPage(){
 
  const alert = await this.alertController.create({
    header: 'Add new list',
    inputs:[{
      name:'title',
      type:'text',
      placeholder:'List\'s name'
    }]
    ,
    buttons: [{
      text:'Cancel',
      role:'cancel',
      handler:()=>{
           console.log('cancelar');
      }},
      {
        text:'Create',
        handler:(data)=>{
         if (data.title.length===0) {
           return;
         } else {
         const id =  this.taskService.crearLista(data.title);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${id}`)
         }
        }
      }
       
    ]
  });

  await alert.present();

}



}
