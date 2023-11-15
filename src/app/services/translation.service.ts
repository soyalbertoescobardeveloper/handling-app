import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as translationsJSON from '../../assets/translations.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = translationsJSON;
  currentLanguage: string;

  private languageChangeSubject = new Subject<string>();
  languageChange = this.languageChangeSubject.asObservable();

  constructor() {
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    localStorage.setItem('selectedLanguage', language);
    this.languageChangeSubject.next(language);
  }

  getTranslation(key: string): string {
    if (this.translations[this.currentLanguage]) {
      return this.translations[this.currentLanguage][key] || key;
    } else {
      return key;
    }
  }
}
