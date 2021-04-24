import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AppLoaderComponent } from './app-loader.component';

@Injectable()
export class AppLoaderService {
  dialogRef: MatDialogRef<AppLoaderComponent>;
  constructor(public dialog: MatDialog) { }

  public open(title: string = 'Aguarde'): Observable<boolean> {
    this.dialogRef = this.dialog.open(AppLoaderComponent, {disableClose: true});
    //this.dialogRef.updateSize('160px', '120px');
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public close() {
    this.dialogRef.close();
  }
}
