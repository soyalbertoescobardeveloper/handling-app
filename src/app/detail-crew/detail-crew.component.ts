import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';
import { ModalCommentComponent } from '../modal-comment/modal-comment.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface MessageData {
  crews?: CrewData[];
}
export interface CrewData {
 
  crew_id: number;
  crew_name: string;
  crew_parental?: string;
  crew_maternal?: string;

  crew_pass_img?: string;
  passport_image_crew_comments?: string;
  passport_image_crew_status?: number;

  crew_visa_img?: string;
  visa_image_crew_status?: number;
  visa_image_crew_comments?: string;

  crew_pass_exp?: string;
  crew_visa_exp?: string;
  crew_lice_exp?: string;
  crew_medi_exp?: string;

  crew_lice_img?: string;
  license_image_crew_status?: number;
  license_image_crew_comments?: string;

  crew_medi_img?: string;
  medical_exam_image_crew_status?: number;
  medical_exam_image_crew_comments?: string;
}

@Component({
  selector: 'app-detail-crew',
  templateUrl: './detail-crew.component.html',
  styleUrls: ['./detail-crew.component.scss'],
})
export class DetailCrewComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  message: MessageData | undefined;
  crew: CrewData | undefined;
  appUrl = environment.apiUrl;
  loading!: HTMLIonLoadingElement;


  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedServicesService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HttpClient,

  ) {

    this.message = {
      crews: [
        {
          crew_id: 1,
          crew_name: '',
          crew_parental: '',
          crew_maternal: '',
          crew_pass_img: '',
          crew_visa_img: '',
          crew_pass_exp: '',
          crew_visa_exp: '',
          passport_image_crew_comments: '',
        },
      ],
    };
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.message = this.sharedDataService.getMessage();
    const crewIdToFind = id ? parseInt(id, 10) : null;
    if (this.message && this.message.crews) {
      this.crew = this.message.crews.find(
        (crew) => crew.crew_id === crewIdToFind
      );
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Detail Operation' : '';
  }
  async openCommentModal() {
    const modal = await this.modalController.create({
      component: ModalCommentComponent,
    });
    return await modal.present();
  }

  checkboxChanged(event: any, propertyName: string) {
    if (!this.crew) {
      return;
    }
    if (propertyName === 'crew_pass_sta') {
      this.crew!.passport_image_crew_status = event.detail.checked ? 1 : 2;
    }
    if (propertyName === 'crew_visa_sta') {
      this.crew!.visa_image_crew_status = event.detail.checked ? 1 : 2;
    }
    if (propertyName === 'crew_license_sta') {
      this.crew!.license_image_crew_status = event.detail.checked ? 1 : 2;
    }
    if (propertyName === 'crew_medical_exam_sta') {
      this.crew!.medical_exam_image_crew_status = event.detail.checked ? 1 : 2;
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
      crew_pass: {
        id: 'crew_id',
        statusKey: 'passport_image_crew_status',
        commentsKey: 'passport_image_crew_comments',
        model: 'crw',
        path: '',
      },
      crew_visa: {
        id: 'crew_id',
        statusKey: 'visa_image_crew_status',
        commentsKey: 'visa_image_crew_comments',
        model: 'crw',
        path: '',
      },
      crew_license: {
        id: 'crew_id',
        statusKey: 'license_image_crew_status',
        commentsKey: 'license_image_crew_comments',
        model: 'crw',
        path: '',
      },
      crew_medical_exam: {
        id: 'crew_id',
        statusKey: 'medical_exam_image_crew_status',
        commentsKey: 'medical_exam_image_crew_comments',
        model: 'crw',
        path: '',
      },
    };
    const mapping = documentMappings[DocumentType];
    const appendToFormData = (formData: FormData, key: string, mapping: any) => {
      let source = mapping.path ? getNestedProperty(this.crew, mapping.path) : this.crew;
      let value = source?.[key] || (key.includes('status') ? 0 : '');
      formData.append(key, value.toString());
    }
      if (mapping) {
      
        const idValue = getNestedProperty(this.crew, mapping.id);
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
        formData.append('_method', 'PUT');
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
