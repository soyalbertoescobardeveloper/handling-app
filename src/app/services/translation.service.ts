import { Injectable } from '@angular/core';
import translations from '../../../resources/translations.json';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = 'en'; 

  setLanguage(language: string) {
    this.currentLanguage = language;
  }

  getTranslation(key: string): string {
    return translations[this.currentLanguage][key];
  }
}
