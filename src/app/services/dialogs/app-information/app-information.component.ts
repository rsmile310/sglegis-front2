import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './app-information.component.html'
})
export class AppInformationComponent {

  constructor(
    public dialogRef: MatDialogRef<AppInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


}
