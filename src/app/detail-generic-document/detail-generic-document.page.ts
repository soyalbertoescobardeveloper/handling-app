import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedCheckService } from '../shared-check.service';

@Component({
  selector: 'app-detail-generic-document',
  templateUrl: './detail-generic-document.page.html',
  styleUrls: ['./detail-generic-document.page.scss'],
})
export class DetailGenericDocumentPage implements OnInit {


  appUrl = environment.apiUrl;
  loading!: HTMLIonLoadingElement;

  documentPath: any;
  label: any;
  buttonId: any;
  buttonIcon: any;
  status: any;
  comments: any;

  detail: any;
  currentState$: Observable<any> | undefined;
  private platform = inject(Platform);
  hasComment: boolean | undefined;
  hasCheck: boolean | undefined;
  statusChange: number | undefined;
  constructor(private route: ActivatedRoute,
     private router: Router,
     private loadingController: LoadingController,
     private http: HttpClient,
     private modalCtrl: ModalController,
     private sharedCheckService: SharedCheckService,
     ) { 
    this.detail = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.currentState$ = this.route.paramMap.pipe(
      map(() => window.history.state.details.queryParams)
    );
    if (this.detail.details.state.status === 1){
      this.hasCheck = true;
      this.statusChange = 1;
    } else if (this.detail.details.state.status === 2) {
      this.statusChange = 2;
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Ope' : '';
  }
  enviarDocumento() {
    throw new Error('Method not implemented.');
  }
  onCommentChange(event: any) {
    this.hasComment = event.target.value.trim() !== '';
  }
  onCheckChange(event: any, buttonId: any) {
    this.hasCheck = event.detail.checked;
    this.statusChange = event.detail.checked ? 1 : 2;
    this.sharedCheckService.setStatusChange(this.statusChange, buttonId);
  }

  async enviarDatos(DocumentType: string) {
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
        id: string;
        statusKey: string;
        commentsKey: string;
        model: string;
        path: string;
      };
    };
    const documentMappings: DocumentMappingType = {
      fuel_release: {
        id: this.detail.details.state.ids,
        statusKey: 'fuel_release_status',
        commentsKey: 'fuel_release_comments',
        model: 'ope',
        path: '',
      },
      piu: {
        id: this.detail.details.state.ids,
        statusKey: 'piu_status',
        commentsKey: 'piu_comments',
        model: 'ope',
        path: '',
      },
      charter_permission_mxn: {
        id: this.detail.details.state.ids,
        statusKey: 'charter_permission_mxn_status',
        commentsKey: 'charter_permission_mxn_comments',
        model: 'ope',
        path: '',
      },
      diplomatic_card: {
        id: this.detail.details.state.ids,
        statusKey: 'diplomatic_card_status',
        commentsKey: 'diplomatic_card_comments',
        model: 'ope',
        path: '',
      },
      airworthiness_card: {
        id: this.detail.details.state.ids,
        statusKey: 'airworthiness_card_status',
        commentsKey: 'airworthiness_card_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      mexican_insurance: {
        id: this.detail.details.state.ids,
        statusKey: 'mexican_insurance_status',
        commentsKey: 'mexican_insurance_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      certificate_tail: {
        id: this.detail.details.state.ids,
        statusKey: 'certificate_tail_status',
        commentsKey: 'certificate_tail_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      worldwide_insurance: {
        id: this.detail.details.state.ids,
        statusKey: 'worldwide_insurance_status',
        commentsKey: 'worldwide_insurance_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      entry_permit: {
        id: this.detail.details.state.ids,
        statusKey: 'entry_permit_status',
        commentsKey: 'entry_permit_comments',
        model: 'air',
        path: 'aircraft.0',
      },
    };
    const mapping = documentMappings[DocumentType];

    const appendToFormData = (formData: FormData, key: string, value: any) => {
      formData.append(key, value.toString());
    };

    if (mapping) {
      
      model = mapping.model || 'ope';
      appendToFormData(formData, mapping.statusKey, this.statusChange);
      appendToFormData(formData, mapping.commentsKey, this.detail.details.state.comment);
      formData.append('method', '_PUT');
    }

    function getNestedProperty(obj: any, path: string) {
      return path.split('.').reduce((o, k) => (o || {})[k], obj);
    }
  
    this.http
      .post(this.appUrl + 'api/update-document/' + model + '/' + mapping.id, formData)
      .subscribe(
        (response: any) => {
          this.modalCtrl.dismiss();
          this.loading.dismiss();
        },
        (error) => {
          console.error('Error al realizar la solicitud HTTP', error);
          this.loading.dismiss();
        }
      );
  }


}
