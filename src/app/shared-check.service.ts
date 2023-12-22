import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCheckService {
  private _statusChangeSubject: BehaviorSubject<{ value: number; buttonId: string }> = new BehaviorSubject({ value: 0, buttonId: '' });
  public statusChange$: Observable<{ value: number; buttonId: string }> = this._statusChangeSubject.asObservable();

  constructor() { }

  setStatusChange(value: number, buttonId: any): void {
    this._statusChangeSubject.next({ value: value, buttonId: buttonId });
  }
}
