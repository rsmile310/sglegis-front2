import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {
  @Input() onChange: Function;
  @Input() accept: string;


  constructor(

  ) { }

  ngOnInit() {
  }

  handleOpenFileModal() {

  }

  handleFileInput(files) {
    this.onChange(files);    
  }

}
