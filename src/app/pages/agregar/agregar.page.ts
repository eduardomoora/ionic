import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista:Lista;
  newItem='';
  constructor(private service:TasksService, private route:ActivatedRoute) { 
    const listaID=this.route.snapshot.paramMap.get('id');
   this.lista=this.service.getList(listaID);
   console.log(this.lista);
  }

  ngOnInit() {
  }
  addItemList(){
    if(this.newItem.length===0){
      return;
    }
   const x =new ListaItem(this.newItem);
   this.lista.items.push(x);
   this.newItem='';
   this.service.saveStorage();

  }

  cambioCheck(item:ListaItem){
    const pendientes=this.lista.items.filter(itemData=>
    !itemData.completado).length;
    console.log({pendientes});
    if (pendientes===0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada= true;
      
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada= false;
    }

 this.service.saveStorage();
  }

  delete(index){

  
 
  this.lista.items.splice( index,1); 
  this.service.saveStorage();

  }
}
