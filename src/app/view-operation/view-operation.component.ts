import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';
import { environment } from '../../environments/environment';

interface MessageData {
  operation_id: number;
  folio: string;
  operator_id: number;
  type: string;
  // ... Otras propiedades
  aircraft: AircraftData[];
  airport: AirportData[];
  services: ServiceData[];
  passengers: PassengerData[];
  crews: CrewData[];
  fuel_release?: string;
  fuel_release_comments?: string;
  fuel_release_status?: number;
  fuel_release_id?: number;
  piu?: string;
  piu_comments?: string;
  piu_id?: number;
  piu_status?: number;
  service_agreement?: string;
  tail_number_listing?: string;

  charter_permission_mxn?: string;
  charter_permission_mxn_status?: number;
  charter_permission_mxn_comments?: string;

  diplomatic_card?: string;
  diplomatic_card_status?: number;
  diplomatic_card_comments?: string;

}
interface CrewData {
  crew_id: number;
  crew_name: string;
  crew_parental: string;
  crew_maternal: string;
  crew_pass_img: string;
  crew_visa_img: string;
  crew_pass_exp: string;
  crew_visa_exp: string;
}
interface PassengerData {
  pax_id: number;
  pax_name: string;
  pax_parental: string;
  pax_maternal: string;
  pax_pass_img: string;
  pax_visa_img: string;
}
interface AircraftData {
  aircraft_id: number;
  tail: string;
  oaci: string;
  operator_id: number;

  airworthiness_card: string;
  airworthiness_card_status: number;
  airworthiness_card_comments: string;
  airworthiness_card_id: number,

  certificate_tail?: string;
  certificate_tail_status: number;
  certificate_tail_comments: string;

  mexican_insurance?: string;
  mexican_insurance_status?: number;
  mexican_insurance_comments: string;

  worldwide_insurance?: string;
  worldwide_insurance_status?: number;
  worldwide_insurance_comments?: string;

  entry_permit?: string;
  entry_permit_status?: number;
  entry_permit_comments?: string;

}
interface AirportData {
  airport_departure_id: number;
  selectDeparture: string;
  selectArrival: string;
  departureCountry: string;
  etd_utc: string;
  eta_utc: string;
}
interface ServiceData {
  service_id: number;
  title: string;
  price: string;
  quantity: number;
  currency: string;
}
interface Invoice {
  name: string;
  amount: string;
  file?: File | null; 
}

@Component({
  selector: 'app-view-operation',
  templateUrl: './view-operation.component.html',
  styleUrls: ['./view-operation.component.scss'],
})
export class ViewOperationComponent implements OnInit {
  message: MessageData | undefined;
  appUrl = environment.apiUrl;
  isChecked: boolean = false;
  comments: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  loading!: HTMLIonLoadingElement;
  https: any;
  invoices: any[] = [];

  currentInvoice: Invoice = {
    name: '',
    amount: '',
    file: null
  };

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedServicesService,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    private cdRef: ChangeDetectorRef
  ) {
    this.message = {
      operation_id: 1,
      folio: '',
      operator_id: 1,
      type: '',
      aircraft: [
        {
          aircraft_id: 1,
          tail: '',
          oaci: '',
          operator_id: 1,

          airworthiness_card: '',
          airworthiness_card_status: 2,
          airworthiness_card_comments: '',
          airworthiness_card_id: 0,

          certificate_tail: '',
          certificate_tail_status: 0,
          certificate_tail_comments: '',
          
          mexican_insurance: '',
          mexican_insurance_status: 0,
          mexican_insurance_comments: '',

          worldwide_insurance: '',
          worldwide_insurance_status: 0,
          worldwide_insurance_comments: '',

          entry_permit: '',
          entry_permit_status: 0,
          entry_permit_comments: '',
        },
      ],
      airport: [
        {
          airport_departure_id: 1,
          selectDeparture: '',
          selectArrival: '',
          departureCountry: '',
          etd_utc: '',
          eta_utc: '',
        },
      ],
      services: [
        {
          service_id: 1,
          title: '',
          price: '',
          quantity: 1,
          currency: '',
        },
      ],
      passengers: [
        {
          pax_id: 1,
          pax_name: '',
          pax_parental: '',
          pax_maternal: '',
          pax_pass_img: '',
          pax_visa_img: '',
        },
      ],
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
        },
      ],
      fuel_release_comments: '',
      fuel_release_status: 0,
      fuel_release_id: 0,

      piu_comments: '',
      piu_status: 1,
      charter_permission_mxn_status: 0,
      charter_permission_mxn_comments: '',
      diplomatic_card_status: 2,
    };
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http.get(this.appUrl + 'api/get-operation/' + id).subscribe(
      (response: any) => {
        this.message = response;
        if (response.invoices && response.invoices.length > 0) {
          this.invoices = response.invoices.map((invoice: { invoice_name: any; invoice_amount: any; invoice_path: any; invoice_id: any; }) => ({
            name: invoice.invoice_name,
            amount: invoice.invoice_amount,
            file: invoice.invoice_path,
            id: invoice.invoice_id,
          }));
        }
        if (this.message !== undefined) {
          this.sharedDataService.setMessage(this.message);
        }
      },
      (error) => {
        console.error('Error al realizar la solicitud HTTP', error);
      }
    );
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Operations' : '';
  }

  checkboxChanged(event: any, propertyName: string) {
    if (propertyName === 'fuel_release_status') {
      this.message!.fuel_release_status = event.detail.checked ? 1 : 2;
    } else if (propertyName === 'piu_status') {
      this.message!.piu_status = event.detail.checked ? 1 : 2;
    } else if (propertyName === 'charter_permission_mxn_status') {
      this.message!.charter_permission_mxn_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'diplomatic_card_status') {
      this.message!.diplomatic_card_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'airworthiness_card_status') {
      this.message!.aircraft[0].airworthiness_card_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'mexican_insurance_status') {
      this.message!.aircraft[0].mexican_insurance_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'certificate_tail_status') {
      this.message!.aircraft[0].certificate_tail_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'worldwide_insurance_status') {
      this.message!.aircraft[0].worldwide_insurance_status = event.detail.checked
        ? 1
        : 2;
    }
    else if (propertyName === 'entry_permit_status') {
      this.message!.aircraft[0].entry_permit_status = event.detail.checked
        ? 1
        : 2;
    }
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
        id:string;
        statusKey: string;
        commentsKey: string;
        model: string;
        path: string;
      };
    };
    const documentMappings: DocumentMappingType = {
      fuel_release: {
        id: 'operation_id',
        statusKey: 'fuel_release_status',
        commentsKey: 'fuel_release_comments',
        model: 'ope',
        path: '',
      },
      piu: {
        id:'operation_id',
        statusKey: 'piu_status',
        commentsKey: 'piu_comments',
        model: 'ope',
        path: '',
      },
      charter_permission_mxn: {
        id:'operation_id',
        statusKey: 'charter_permission_mxn_status',
        commentsKey: 'charter_permission_mxn_comments',
        model: 'ope',
        path: '',
      },
      diplomatic_card: {
        id: 'operation_id',
        statusKey: 'diplomatic_card_status',
        commentsKey: 'diplomatic_card_comments',
        model: 'ope',
        path: '',
      },
      airworthiness_card: {
        id: 'aircraft.0.aircraft_id',
        statusKey: 'airworthiness_card_status',
        commentsKey: 'airworthiness_card_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      mexican_insurance: {
        id: 'aircraft.0.aircraft_id',
        statusKey: 'mexican_insurance_status',
        commentsKey: 'mexican_insurance_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      certificate_tail: {
        id: 'aircraft.0.aircraft_id',
        statusKey: 'certificate_tail_status',
        commentsKey: 'certificate_tail_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      worldwide_insurance: {
        id: 'aircraft.0.aircraft_id',
        statusKey: 'worldwide_insurance_status',
        commentsKey: 'worldwide_insurance_comments',
        model: 'air',
        path: 'aircraft.0',
      },
      entry_permit: {
        id: 'aircraft.0.aircraft_id',
        statusKey: 'entry_permit_status',
        commentsKey: 'entry_permit_comments',
        model: 'air',
        path: 'aircraft.0',
      },
    };
    const mapping = documentMappings[DocumentType];

    const appendToFormData = (formData: FormData, key: string, mapping: any) => {
      let source = mapping.path ? getNestedProperty(this.message, mapping.path) : this.message;
      let value = source?.[key] || (key.includes('status') ? 0 : '');
      formData.append(key, value.toString());
    }
    
    if (mapping) {
      
      const idValue = getNestedProperty(this.message, mapping.id);
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
          this.modalCtrl.dismiss();
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

  async sendInvoice(type: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null,
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
    if (type === 'invoice') {
      const formData: FormData = new FormData();
      formData.append('name', this.currentInvoice.name);
      formData.append('amount', this.currentInvoice.amount.toString());
      if (this.currentInvoice.file) {
        formData.append('invoice_path', this.currentInvoice.file);
      }
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.http.post<any>(this.appUrl+ 'api/invoice/'+ id, formData).subscribe(response => {
        if (response && response.documents && response.documents.length > 0) {
          const newInvoice = {
            name: response.name,
            amount: response.amount,
            file: response.documents[0].path
          };
          this.invoices.push(newInvoice);
        }
        this.currentInvoice = {
          name: '',
          amount: '',
          file: null
        };
        this.loading.dismiss();
        this.modalCtrl.dismiss();
      }, error => {
        this.loading.dismiss();
        console.error('Error al enviar la factura:', error);
      });
    }
  }
  

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length) {
      this.currentInvoice.file = input.files[0];
    }
  }

  async deleteInvoice(invoiceId: number) {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-spinner',
      spinner: null,
      translucent: true,
      backdropDismiss: false,
    });
    await this.loading.present();
    const deleteUrl = `${this.appUrl}api/delete-invoice/${invoiceId}`;
    this.http.delete(deleteUrl).subscribe(
        response => {
            console.log('Factura eliminada con éxito', response);
            this.invoices = this.invoices.filter(invoice => invoice.id !== invoiceId);
            this.loading.dismiss();
        },
        error => {
            this.loading.dismiss();
        }
    );
}
  
}
