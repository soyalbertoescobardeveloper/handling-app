import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  currentLanguage = 'es';
  public alertButtons = ['OK'];
  public alertInputs = [
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
  constructor(public translationService: TranslationService) { }

  ngOnInit() {
  }

  changeLanguage = (data: any) => {
    this.currentLanguage = data;
    this.translationService.setLanguage(this.currentLanguage);
  }
}
