import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';

interface MessageData {
  passengers?: PassengerData[];
}
interface PassengerData{
  pax_id: number;
  pax_name: string;
  pax_parental: string;
  pax_maternal: string;
  pax_pass_img?: string;
  pax_visa_img?: string;
  pax_pass_exp?: string;
  pax_visa_exp?: string;
}

@Component({
  selector: 'app-detail-pax',
  templateUrl: './detail-pax.component.html',
  styleUrls: ['./detail-pax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DetailPaxComponent  implements OnInit {
  message: MessageData | undefined;
  pax: PassengerData | undefined;

  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  
  constructor(private route: ActivatedRoute,private sharedDataService: SharedServicesService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.message = this.sharedDataService.getMessage();
    const passengerIdToFind = id ? parseInt(id, 10) : null;
    if (this.message && this.message.passengers){
      this.pax = this.message.passengers.find(pax => pax.pax_id === passengerIdToFind);
      console.info('tag', this.pax)
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Detail Operation' : '';
  }
}
