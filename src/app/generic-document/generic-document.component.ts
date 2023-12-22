import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-generic-document',
  templateUrl: './generic-document.component.html',
  styleUrls: ['./generic-document.component.scss'],
})
export class GenericDocumentComponent  implements OnInit {
  @Input()
  documentPath!: any;
  @Input()
  status!: any;
  @Input()
  comments!: any;
  @Input()
  label!: string;
  @Input()
  buttonId!: string;
  @Input()
  buttonIcon!: string;
  @Input()
  id!: number;
  @Input()
  data!: any;

  appUrl = environment.apiUrl;

  constructor(
    private router: Router,
    ) { }

  ngOnInit() {}

  isPdf(path: string): boolean {
    return path ? path.endsWith('.pdf') : false;
  }

  getStatusLabel(status: number | undefined): string {
    if (!status) return 'Not Verified';

    switch (status) {
      case 0:
        return 'Not verified';
      case 1:
        return 'Aprobado';
      case 2:
        return 'Rechazado';
      default:
        return '';
    }
  }

  getStatusClass(status: number | undefined): string {
    switch (status) {
      case 1: 
        return 'approved';
      case 2: 
        return 'rejected';
      case 3: 
        return 'not-verified';
      default:
        return '';
    }
  }
  openDetailDocument(documentPath: any,label: any,buttonId: any,buttonIcon: any,status: any,comments:any, id:any, data: any){
    const objState: NavigationExtras = {
      state: {
        documentPaths: documentPath,
        labels: label,
        buttonIds: buttonId,
        buttonIcons:buttonIcon,
        status:status,
        comment:comments,
        ids: id,
        datas: data
      }
    };
    this.router.navigate(['/detail-generic-document'], { state: {details: objState}});
  }


}
