import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { SharedServicesService } from '../services/shared-services.service';
import { ModalCommentComponent } from '../modal-comment/modal-comment.component';
import { environment } from '../../environments/environment';

export interface MessageData {
  crews?: CrewData[];
}
export interface CrewData {
  crew_id: number;
  crew_name: string;
  crew_parental?: string;
  crew_maternal?: string;

  crew_pass_img?: string;
  crew_visa_img?: string;

  crew_pass_exp?: string;
  crew_visa_exp?: string;

  crew_lice_img?: string;
  crew_lice_exp?: string;

  crew_medi_img?: string;
  crew_medi_exp?: string;
}

@Component({
  selector: 'app-detail-crew',
  templateUrl: './detail-crew.component.html',
  styleUrls: ['./detail-crew.component.scss'],
})
export class DetailCrewComponent  implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  message: MessageData | undefined;
  crew: CrewData | undefined;
  appUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute,
    private sharedDataService: SharedServicesService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.message = this.sharedDataService.getMessage();
    const crewIdToFind = id ? parseInt(id, 10) : null;
    if (this.message && this.message.crews) {
      this.crew = this.message.crews.find(crew => crew.crew_id === crewIdToFind);
      console.info('tag', this.crew)
    }
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Detail Operation' : '';
  }
  async openCommentModal() {
    const modal = await this.modalController.create({
     component: ModalCommentComponent
     });
     return await modal.present();
  }

}
