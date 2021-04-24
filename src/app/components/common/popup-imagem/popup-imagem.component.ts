import { AppLoaderService } from './../../../services/dialogs/app-loader/app-loader.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup-imagem',
  templateUrl: './popup-imagem.component.html'

})
export class PopupImagemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupImagemComponent>,
              public loader : AppLoaderService) { }

  ngOnInit() {    
    this.loader.open();
  }

  imgCarregada(){
    this.loader.close();
  }

}
