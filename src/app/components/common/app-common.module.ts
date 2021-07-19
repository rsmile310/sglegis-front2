import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { 
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelect,
  MatOption,
  MatDialogModule
} from '@angular/material';
import { TopbarComponent } from './topbar/topbar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CommonDirectivesModule } from '../../directives/common/common-directives.module';
import { ThemeService } from '../../services/theme/theme.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PopupImagemComponent } from './popup-imagem/popup-imagem.component';
import { GradeVisualizarComponent } from './grade-visualizar/grade-visualizar.component';
// import { FileFieldComponent } from './file-field/file-field.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CommonDirectivesModule,
    MatDialogModule,
    NgxDatatableModule    
  ],
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    TopbarComponent, 
    NavigationComponent, 
    NotificationsComponent, 
    BreadcrumbComponent, PopupImagemComponent, GradeVisualizarComponent    
  ],
  entryComponents :[PopupImagemComponent],
  providers: [ThemeService],
  exports: []
})
export class AppCommonModule {}