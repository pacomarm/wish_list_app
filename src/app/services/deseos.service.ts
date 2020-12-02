import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { createHostListener } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 

    this.loadStorage();
  }
  createLista(title: string){
    const newList = new Lista(title);
    this.listas.push(newList);
    this.saveStorage();
    return newList.id;
  }

  borrarLista(lista: Lista){
    this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
    this.saveStorage();
  }

  

  getList(id: string | number)
  {
    id = Number(id);
    return this.listas.find(listaData => listaData.id === id
    );
  }

  saveStorage(){

    localStorage.setItem('data', JSON.stringify(this.listas));

  }

  loadStorage(){

    if(localStorage.getItem('data')){
      this.listas = JSON.parse(localStorage.getItem('data'));
    } else {
      this.listas = [];
    }
  }

}
