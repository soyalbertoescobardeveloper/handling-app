import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
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
  piu?: string;
  piu_comments?: string;
  piu_status?: number;
  service_agreement?: string;
  tail_number_listing?: string;
}
interface CrewData{
  crew_id: number;
  crew_name: string;
  crew_parental: string;
  crew_maternal: string;
  crew_pass_img: string;
  crew_visa_img: string;
  crew_pass_exp: string;
  crew_visa_exp: string;
}
interface PassengerData{
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
  // ... Otras propiedades
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

@Component({
  selector: 'app-view-operation',
  templateUrl: './view-operation.component.html',
  styleUrls: ['./view-operation.component.scss'],
})
export class ViewOperationComponent  implements OnInit {
  message: MessageData | undefined;
  appUrl = environment.apiUrl;
  isChecked: boolean = false;
  comments: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  
  constructor(private http: HttpClient, private sharedDataService: SharedServicesService,
    private modalCtrl: ModalController) { 

      this.message = {
        operation_id: 1, // un valor inicial
        folio: '', // un valor inicial
        operator_id: 1, // un valor inicial
        type: '', // un valor inicial
        aircraft: [{
          aircraft_id: 1,
          tail: '',
          oaci: '',
          operator_id: 1,
        }],
        airport: [{
          airport_departure_id: 1,
          selectDeparture: '',
          selectArrival: '',
          departureCountry: '',
          etd_utc: '',
          eta_utc: ''
      }],
        services: [
          {
            service_id: 1,
            title: '',
            price: '',
            quantity: 1,
            currency: '',
          }
        ],
        passengers: [{
          pax_id: 1,
          pax_name: '',
          pax_parental: '',
          pax_maternal: '',
          pax_pass_img: '',
          pax_visa_img: '',
        }],
        crews: [{
          crew_id: 1,
          crew_name: '',
          crew_parental: '',
          crew_maternal: '',
          crew_pass_img: '',
          crew_visa_img: '',
          crew_pass_exp: '',
          crew_visa_exp: '',
        }],
        fuel_release_comments: '',
        fuel_release_status: 1,
        piu_comments: '',
        piu_status: 1,
      }
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http.get(this.appUrl+'api/get-operation/'+id).subscribe(
      (response: any) => {
        this.message = response;
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
    const isIos = this.platform.is('ios')
    return isIos ? 'Operations' : '';
  }

  checkboxChanged(event: any) {
    this.message!.fuel_release_status = event.detail.checked ? 1 : 2;
  }

  enviarDatos(DocumentType: string) {
    const datos = {
      documentType: DocumentType,
      status: this.isChecked ? 1 : 2,
      comments: this.message?.fuel_release_comments
    };
    console.log(datos);
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http.put(this.appUrl+'api/update-documents/'+id+'/'+datos.documentType, datos).subscribe(
      (response: any) =>{
        this.modalCtrl.dismiss();
      },
      (error) => {
        console.error('Error al realizar la solicitud HTTP', error);
      }
    );
  }

  getStatusLabel(status: number | undefined): string {
    if (!status) return '';

    switch (status) {
        case 1:
            return 'Aprobado';
        case 2:
            return 'Rechazado';
        default:
            return '';
    }
}

}
