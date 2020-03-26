import { Component, OnInit,Input} from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@Input() terminada=false;
  constructor(public  taskService:TasksService,private  router:Router) { }

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
}
