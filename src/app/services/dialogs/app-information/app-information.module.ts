import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppInformationComponent } from './app-information.component';
import { AppInformationService } from './app-information.service';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule    
  ],
  exports:[AppInformationComponent],
  providers : [AppInformationService],
  declarations: [AppInformationComponent],
  entryComponents: [AppInformationComponent]
})
export class AppInformationModule { }
