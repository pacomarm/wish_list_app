import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
})
export class Tab1Page {
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
  }

  

  async agregarLista(){
    const alert = await this.alertController.create({
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name of list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('Cancel');
          }

        },
        {
          text: 'Create',
          handler: (data) => {
            if (data.title.length === 0)
            {
              return;
            }
            const listId = this.deseosService.createLista(data.title);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
          }
        }
      ]
    });
    alert.present();

  }
}
