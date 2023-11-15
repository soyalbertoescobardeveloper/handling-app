import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TranslationService } from 'src/app/services/translation.service';

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
  blob: Blob | undefined;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController,
    private cdr: ChangeDetectorRef,
    public translationService: TranslationService,
  ) {}

  async ngOnInit() {
    const user = await this.storage.get('user');
    if (user) {
      this.username = user.id;
      const token = await this.storage.get('access_token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.http
        .get(this.appUrl + 'api/auth/get-agent/' + this.username, { headers })
        .subscribe(
          (response: any) => {
            if (response) {
              this.name = response.name;
              this.lastname = response.rfc || ''; // Usando '||' en caso de que sea null
              this.email = response.email;
              this.license_agent = response.license_agent;
              this.phone = response.phones;
              this.bir = new Date(response.birthday_date)
                .toISOString()
                .split('T')[0];
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
  async changePhoto() {
    try {
      // Tomar una foto o seleccionarla de la galería
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl, // Usar DataUrl para obtener los datos de la imagen
        source: CameraSource.Prompt, // Permite al usuario elegir entre Cámara o Galería
      });

      if (image.dataUrl) {
        this.loading = await this.loadingController.create({
          cssClass: 'custom-spinner',
          spinner: null,
          translucent: true,
          backdropDismiss: false,
        });
        await this.loading.present();
        const img = new Image();
        img.src = image.dataUrl;

        img.onload = async () => {
          const maxWidth = 800;
          const maxHeight = 800;
          let newWidth = img.width;
          let newHeight = img.height;

          if (img.width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (img.height * maxWidth) / img.width;
          }

          if (newHeight > maxHeight) {
            newWidth = (newWidth * maxHeight) / newHeight;
            newHeight = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = newWidth;
          canvas.height = newHeight;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
          } else {
            console.error('El contexto de dibujo es nulo');
          }
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

          const blob = this.dataURLtoBlob(compressedDataUrl);

          const formData = new FormData();
          formData.append('avatar', blob);

          const token = await this.storage.get('access_token');
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });
          this.http
            .post(this.appUrl + 'api/auth/update-agent/' + this.username, formData, {headers})
            .subscribe(
              (response: any) => {
                this.avatar = response.data.avatar;
                this.cdr.detectChanges();
                this.loading.dismiss();
              },
              (error) => {
                console.error('Error updating profile', error);
                this.messsageAlert = error.error.description.join(', ');
                this.isAlertOpen = true;
                this.loading.dismiss();
              }
            );
        };
      } else {
        console.error('No se pudo obtener la imagen.');
        this.loading.dismiss();
      }
    } catch (error) {
      console.error('Error al cambiar la foto de perfil', error);
      this.loading.dismiss();
    } finally {
      this.loading.dismiss();
    }
  }

  dataURLtoBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
    if (this.name) {
      formData.append('name', this.name);
    }
    if (this.license_agent) {
      formData.append('license_agent', this.license_agent);
    }
    if (this.lastname) {
      formData.append('rfc', this.lastname);
    }
    if (this.bir) {
      formData.append('birthday_date', this.bir);
    }
    if (this.email) {
      formData.append('email', this.email);
    }
    if (this.clave) {
      formData.append('interbank_key', this.clave);
    }
    if (this.phone) {
      formData.append('phones', this.phone);
    }
    if (this.blob) {
      formData.append('avatar', this.blob);
    }
    const token = await this.storage.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .post(this.appUrl + 'api/auth/update-agent/' + this.username, formData, {headers})
      .subscribe(
        (response: any) => {
          this.avatar = response.avatar;
          this.cdr.detectChanges();
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
