import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
})
export class AgregarPage{

  lista: Lista;
  nameItem: string;
  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) {    
    const listId = this.route.snapshot.paramMap.get('listId');
    this.lista = this.deseosService.getList(listId);
    
  }

  addItem(){
    if(this.nameItem.length === 0){
      return;
    }
    const newListItem = new ListaItem(this.nameItem);
    this.lista.items.push(newListItem);
    this.nameItem = '';
    this.deseosService.saveStorage();
  }

  cambioCheck(item: ListaItem){
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;
    
    if(pendientes === 0)
    {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    
    this.deseosService.saveStorage();
  }

  borrar(i: number){
    this.lista.items.splice(i, 1);
    this.deseosService.saveStorage();
  }
}
