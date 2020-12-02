import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
})
export class ListasComponent{

  @Input() terminada = true;
  @ViewChild(IonList) lista2: IonList;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) { }

  listaSeleccionada(lista: Lista){

    if(this.terminada)
    {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){ 
    const alert = await this.alertController.create({
      header: 'Edit list List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: lista.titulo,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('Cancel');
            this.lista2.closeSlidingItems();
          }

        },
        {
          text: 'Update',
          handler: (data) => {
            if (data.title.length === 0)
            {
              return;
            }
            lista.titulo = data.title;
            this.deseosService.saveStorage();
            this.lista2.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

}
