import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RefresherCustomEvent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { IonSpinner } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  private apiUrl = environment.apiUrl;
  loading!: HTMLIonLoadingElement;
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private http: HttpClient,private loadingController: LoadingController, private storage: Storage) {
    
  }
  messages: any[] = [];   
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async ngOnInit() {
    console.log("entre en onInit folder");
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null, 
      translucent: true,
      backdropDismiss: false,
     
    });
    await this.loading.present();
    const user = await this.storage.get('user');
    if (user && user.id) {
    this.http.get(`${this.apiUrl}api/agent/${user.id}`).subscribe(
      (response: any) => {
        this.loading.dismiss();
        if (Array.isArray(response)) {
          this.messages = response;
        } else {
          console.error('La respuesta no es un array válido:', response);
        }
      },
      (error) => {
        this.loading.dismiss();
        console.error('Error al realizar la solicitud HTTP', error);
      }
    );
   } else {
    console.log("entre en else de ngOnufrneerfg")
   }
}
}
