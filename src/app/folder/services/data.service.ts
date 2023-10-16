import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message {
  fromName: string;
  tail: string;
  airportDeparture: string;
  airportArrival: string;
  eta: string;
  etd: string;
  flightType: string;
  status: number;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}
