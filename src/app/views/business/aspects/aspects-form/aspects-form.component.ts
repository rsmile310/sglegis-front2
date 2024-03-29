import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { roles } from 'app/models/auth/roles';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-aspects-form',
  templateUrl: './aspects-form.component.html',
  styleUrls: ['./aspects-form.component.css']
})
export class AspectsFormComponent implements OnInit {
  public aspectForm: FormGroup;
  customers_groups = [];
  areas = [];

  currentUser:any;
  profile = profile;
  roles = roles;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AspectsFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    public dialog: MatDialog,
    private auth: AuthGuard,
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {  
    this.aspectForm = new FormGroup({
      area_aspect_id: new FormControl(record.area_aspect_id),
      area_aspect_name: new FormControl(record.area_aspect_name, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      area_id: new FormControl(record.area_id, [Validators.required])
    });

    this.getAreas();
  }

  saveAspect() {
    let aspect = this.aspectForm.value;
    this.loader.open();
    this.crudService.Save(aspect, this.data.new, "/areaaspect", aspect.area_aspect_id).subscribe(res => {
      if (res.status == 200) {
        this.loader.close();
        this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
        this.dialogRef.close('');
      } else {
        this.loader.close();
        this.snackBar.open("Erro ao gravar registro:" + res.Message, "", { duration: 5000 });
        this.dialogRef.close('');
      }
    });  
  }

  getAreas() {
    this.crudService.GetParams(undefined, "/area").subscribe(res => {
      if (res.status == 200) {
        this.areas = [];
        this.areas = res.body;
      }
    });
  }

  deleteAspect(){    
    let aspect = this.aspectForm.value;    
    this.confirm.confirm("Exclusão - Aspect", "Tem certeza que deseja excluir o Aspecto " + aspect.area_aspect_id).subscribe(result => {
      if (result === true) {
        this.loader.open("Excluindo - Aspecto");
        this.crudService.DeleteParams(aspect.area_aspect_id, "/areaaspect").subscribe(res => {          
          if (res.status == 200) {
            this.snackBar.open("Aspect excluído com sucesso!", "", { duration: 3000 });
            this.dialogRef.close('OK');
            this.loader.close();
          }
          else {
            this.snackBar.open("Erro ao excluir Aspecto", "", { duration: 5000 });
          }
          this.loader.close();
        })
      }
    });
  }  
}
