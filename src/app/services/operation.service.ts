import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MessageData {
  operation_id: number;
  folio: string;
  operator_id: number;
  type: string;
  aircraft: AircraftData[];
  airport: AirportData[];
  services: ServiceData[];
  passengers: PassengerData[];
  crews: CrewData[];
}

export interface AircraftData {
  aircraft_id: number;
  tail: string;
  oaci: string;
  operator_id: number;
}

export interface AirportData {
  airport_departure_id: number;
  selectDeparture: string;
  selectArrival: string;
  departureCountry: string;
  etd_utc: string;
  eta_utc: string;
}

export interface ServiceData {
  service_id: number;
  title: string;
  price: string;
  quantity: number;
  currency: string;
}

export interface PassengerData {
  pax_id: number;
  pax_name: string;
  pax_parental: string;
  pax_maternal: string;
}

export interface CrewData {
  crew_id: number;
  crew_name: string;
  crew_parental: string;
  crew_maternal: string;
}

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private apiUrl = 'https://handling-dev.sae.com.mx/';

  constructor(private http:  HttpClient) {}

  
  getOperationData(id: string): Observable<MessageData> {
    const url = `${this.apiUrl}api/get-operation/${id}`;
    return this.http.get<MessageData>(url);
  }
}
