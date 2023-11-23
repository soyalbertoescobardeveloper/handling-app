import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { MessageModule } from './message/message.module';
import { ProfileModule } from './profile/profile.module';
import { HelpModule } from './help/help.module';
import { TranslationService } from '../services/translation.service';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    MessageModule,
    ProfileModule,
    HelpModule,
    NotificationModule,
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
