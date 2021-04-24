import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `<h3 >{{ data.title }}</h3>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
    
    <span fxFlex></span>
    <button 
    type="button"
    color="warn"
    mat-raised-button 
    (click)="dialogRef.close(false)">Cancelar</button>
    <span fxFlex></span>

    <button 
    type="button" 
    mat-raised-button
    color="primary" 
    (click)="dialogRef.close(true)">OK</button>
    <span fxFlex></span>
    &nbsp;    
    </div>`,
})
export class AppComfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AppComfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}