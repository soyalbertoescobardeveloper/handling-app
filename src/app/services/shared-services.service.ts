import { Injectable } from '@angular/core';
import { MessageData } from './operation.service';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
  private message: MessageData | undefined;

  setMessage(message: MessageData) {
    this.message = message;
  }

  getMessage(): MessageData | undefined {
    return this.message;
  }
  constructor() { }
}
