import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  clave: string = '';
  phone: string = '';
  airport: string = '';
  avatar: string = '';
  license_agent: string = '';
  appUrl = environment.apiUrl;
  public username: string | undefined;
  icao: string = '';
  bir: string = '';
  loading!: HTMLIonLoadingElement;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  messsageAlert: any;

  constructor(private http: HttpClient, private storage: Storage,
    private loadingController: LoadingController,
    ) {}

  async ngOnInit() {
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.id;
      this.http.get(this.appUrl + 'api/get-agent/' + this.username).subscribe(
        (response: any) => {
          if (response) {
            this.name = response.name;
            this.lastname = response.rfc || ''; // Usando '||' en caso de que sea null
            this.email = response.email;
            this.license_agent = response.license_agent;
            this.phone = response.phones;
            this.bir = new Date(response.birthday_date).toISOString().split('T')[0];
            this.clave = response.interbank_key;
            this.airport = response.airport.name;
            this.icao = response.airport.icao_code;
            this.avatar = response.avatar;
          }
        },
        (error) => {
          console.error('Error al obtener datos del agente:', error);
        }
      );
    }
  }

  setOpen(isOpen: boolean) {
      this.isAlertOpen = isOpen;
    }
  changePhoto() {
    // Aquí va el código para cambiar la foto de perfil.
  }

  async sendProfile() {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null,
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
    const formData: FormData = new FormData();
    formData.append('name', this.name);
    formData.append('license_agent', this.license_agent);
    formData.append('rfc', this.lastname);
    if(this.bir){
      formData.append('birthday_date', this.bir);
    }
    formData.append('email', this.email);
    formData.append('interbank_key', this.clave);
    formData.append('phones', this.phone);

    this.http
      .post(this.appUrl + 'api/update-agent/' + this.username, formData)
      .subscribe(
        (response: any) => {
          console.log('Profile updated successfully', response);
          this.loading.dismiss();
        },
        (error) => {
          console.error('Error updating profile', error);
          this.messsageAlert = error.error.description.join(', ');
          this.isAlertOpen = true; 
          this.loading.dismiss();
        }
      );
  }
}
