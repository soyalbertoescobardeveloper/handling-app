import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';

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
  private apiUrl = 'https://handling-dev.sae.com.mx/';
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  
  constructor(private http: HttpClient, private sharedDataService: SharedServicesService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.http.get('https://handling-dev.sae.com.mx/api/get-operation/'+id).subscribe(
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

}
