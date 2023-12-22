import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

interface AlertInput {
  label: string;
  type: string;
  value: string;
  checked?: boolean; 
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  currentLanguage = 'es';
  public alertButtons = ['OK'];
  public alertInputs: AlertInput[] = [
    {
      label: 'Español',
      type: 'radio',
      value: 'es',
    },
    {
      label: 'English',
      type: 'radio',
      value: 'en',
    },
  ];
  constructor(public translationService: TranslationService) { 
    this.currentLanguage = translationService.currentLanguage;
    this.setDefaultLanguage();
  }

  ngOnInit() {
  }

  changeLanguage = (data: any) => {
    this.currentLanguage = data;
    this.translationService.setLanguage(this.currentLanguage);
  }
  
  private setDefaultLanguage() {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage && this.alertInputs.find(input => input.value === storedLanguage)) {
      this.currentLanguage = storedLanguage;
      this.alertInputs.forEach(input => {
        input.checked = input.value === this.currentLanguage;
      });
    }
  }
}
