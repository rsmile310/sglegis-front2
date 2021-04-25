import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AppInformationComponent } from './app-information.component';

@Injectable()
export class AppInformationService {

  constructor(public dialog: MatDialog) { }

  public information(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AppInformationComponent>;
    dialogRef = this.dialog.open(AppInformationComponent, {
      width: '380px',      
      disableClose: true,
      data: {title, message}
    });
    return dialogRef.afterClosed();
  }

}
