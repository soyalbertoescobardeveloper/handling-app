import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

interface MessageData {
  passengers?: PassengerData[];
}
interface PassengerData {
  pax_id: number;
  pax_name: string;
  pax_parental: string;
  pax_maternal: string;
  pax_pass_img?: string;
  pax_visa_img?: string;
  pax_pass_exp?: string;
  pax_visa_exp?: string;

  passport_image_pax_comments?: string;
  passport_image_pax_status?: number;

  visa_image_pax_status?: number;
  visa_image_pax_comments?: string;
}

@Component({
  selector: 'app-detail-pax',
  templateUrl: './detail-pax.component.html',
  styleUrls: ['./detail-pax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPaxComponent implements OnInit {
  message: MessageData | undefined;
  pax: PassengerData | undefined;
  appUrl = environment.apiUrl;
  loading!: HTMLIonLoadingElement;

  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedServicesService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HttpClient,
  ) {
     this.message = {
       passengers: [
         {
           passport_image_pax_comments: '',
           pax_id: 0,
            pax_name: '',
            pax_parental: '',
            pax_maternal: '',
         },
       ],
     };
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.message = this.sharedDataService.getMessage();
    const passengerIdToFind = id ? parseInt(id, 10) : null;
    if (this.message && this.message.passengers) {
      this.pax = this.message.passengers.find(
        (pax) => pax.pax_id === passengerIdToFind
      );
      console.info('tag', this.pax);
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Detail Operation' : '';
  }

  checkboxChanged(event: any, propertyName: string) {
    if (!this.pax) {
      return;
    }
    if (propertyName === 'pax_pass_sta') {
      this.pax!.passport_image_pax_status = event.detail.checked ? 1 : 2;
    }
    if (propertyName === 'pax_visa_sta') {
      this.pax!.visa_image_pax_status = event.detail.checked ? 1 : 2;
    }
  }
  async sendVerify(DocumentType: string){
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null,
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
    let formData: FormData = new FormData();
    let model;
    let ids;
    type DocumentMappingType = {
      [key: string]: {
        id:string;
        statusKey: string;
        commentsKey: string;
        model: string;
        path: string;
      };
    };
    const documentMappings: DocumentMappingType = {
      pax_pass: {
        id: 'pax_id',
        statusKey: 'passport_image_pax_status',
        commentsKey: 'passport_image_pax_comments',
        model: 'pax',
        path: '',
      },
      pax_visa: {
        id: 'pax_id',
        statusKey: 'visa_image_pax_status',
        commentsKey: 'visa_image_pax_comments',
        model: 'pax',
        path: '',
      },
    };
    const mapping = documentMappings[DocumentType];
    const appendToFormData = (formData: FormData, key: string, mapping: any) => {
      let source = mapping.path ? getNestedProperty(this.pax, mapping.path) : this.pax;
      let value = source?.[key] || (key.includes('status') ? 0 : '');
      formData.append(key, value.toString());
    }
      if (mapping) {
      
        const idValue = getNestedProperty(this.pax, mapping.id);
        if (idValue !== undefined && idValue !== null) {
          ids = idValue;
        } else {
          ids = mapping.id;
        }
        model = mapping.model || 'ope';
        appendToFormData(
          formData,
          mapping.statusKey,
          mapping
        );
        appendToFormData(
          formData,
          mapping.commentsKey,
          mapping
        );
        formData.append('method', '_PUT');
      }
    function getNestedProperty(obj: any, path: string) {
      return path.split('.').reduce((o, k) => (o || {})[k], obj);
    }

    this.http
    .post(this.appUrl + 'api/update-document/' + model + '/' + ids, formData)
    .subscribe(
      (response: any) => {
        this.modalController.dismiss();
        this.loading.dismiss();
      },
      (error) => {
        console.error('Error al realizar la solicitud HTTP', error);
        this.loading.dismiss();
      }
    );
  }
  getStatusLabel(status: number | undefined): string {
    if (!status) return 'Not Verified';

    switch (status) {
      case 0:
        return 'Not verified';
      case 1:
        return 'Aprobado';
      case 2:
        return 'Rechazado';
      default:
        return '';
    }
  }
}
