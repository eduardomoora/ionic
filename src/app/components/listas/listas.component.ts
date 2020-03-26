import { Component, OnInit,Input, ViewChild} from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList, { static: true}) lista: IonList;
  @Input() terminada=false;
//this close all of elements into ion list



  constructor(public  taskService:TasksService,private  router:Router,public alertController:AlertController) { }

  ngOnInit() {}

  GoList(lista:Lista){
 
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    } 
   
  
  }

  deleteList(item:Lista){


 
   this.taskService.deleteList(item);
   

  }

  async editTitle(list:Lista){
 
    const alert = await this.alertController.create({
      header: 'Edit ',
      inputs:[{
        name:'titulo',
        type:'text',
        value: list.titulo,
       
      }]
      ,
      buttons: [{
        text:'Cancel',
        role:'cancel',
        handler:()=>{
             console.log('cancelar');
             this.lista.closeSlidingItems();
        }},
        {
          text:'accept',
          handler:(data)=>{
           if (data.titulo.length===0) {
             return;
           } else {
           list.titulo=data.titulo;
           this.taskService.saveStorage();
             this.lista.closeSlidingItems();
           }
          }
        }
         
      ]
    });
  
    await alert.present();
  
  }
}
