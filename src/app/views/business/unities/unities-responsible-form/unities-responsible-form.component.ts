import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { roles } from 'app/models/auth/roles';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-unities-responsible-form',
  templateUrl: './unities-responsible-form.component.html',
  styleUrls: ['./unities-responsible-form.component.css']
})
export class UnitiesResponsibleFormComponent implements OnInit {
  responsibleForm: FormGroup;
  selectedAspects = [];
  aspectInvalid = true;
  aspects = [];
  areasWithAspects = [];
  responsibles = [];
  deletedResponsibles = [];

  currentUser:any;
  profile = profile;
  roles = roles;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UnitiesResponsibleFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
    private auth: AuthGuard,
  ) { }

  ngOnInit() {
    this.currentUser = this.auth.getUser();
    this.prepareScreen(this.data.payload);
  }

  ngDoCheck() {
    this
  }

  prepareScreen(record) {    
    this.responsibleForm = new FormGroup({
      unity_aspect_responsible_name: new FormControl('', [Validators.required]),
      unity_aspect_responsible_email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.getAreasWithAspects(record.customer_unity_id);
    this.getResponsiblesAspects(record.customer_unity_id);
  }

  getAreasWithAspects(unity_id) {
    this.crudService.GetParams(undefined, `/customerunity/${unity_id||"0"}/aspectsonly`).subscribe(res => {
      if (res.status == 200) {
        this.areasWithAspects = [];
        this.areasWithAspects = res.body;
      }
    });
  }

  getResponsiblesAspects(unity_id) {
    this.crudService.GetParams(undefined, `/customerunity/${unity_id || 0}/responsibles`).subscribe(res => {
      if (res.status == 200) {
        this.responsibles = [];
        this.responsibles = res.body.map(responsible => {
          return {
            ...responsible,
            tooltip: responsible.aspects.map(as => as.area_aspect_name).join(", "),
          }
        });        
      }      
    })
  }


  toggleAll(arearWithAspect, evento) {
    for (let i = 0; i < arearWithAspect.aspects.length; i++) {
      arearWithAspect.aspects[i].checked = (evento.checked) ? "S" : "N";
    }
  }

  toggle(aspect, evento) {
    aspect.checked = (evento.checked) ? "S" : "N";
  }

  addResponsible() {
    let newResponsible = this.responsibleForm.value;    
    this.responsibles = [...this.responsibles, {
      unity_aspect_responsible_id: this.responsibles.length + 1,
      ...newResponsible,
      aspects: [
        ...this.selectedAspects
      ],
      tooltip: this.selectedAspects.map(aspect => aspect.area_aspect_name).join(', '),
      isNew: true
    }];    
    this.responsibleForm.reset();    
    this.selectedAspects = [];
    this.aspectInvalid = true;
  }

  removeResponsible(info: any) {
    // this.confirm.confirm("Delete - Responsible", "Are you sure to delete a Responsible: " + info.unity_aspect_responsible_name).subscribe(res => {
      // if (res === true) {
        this.responsibles = this.responsibles.filter(res => res.unity_aspect_responsible_id !== info.unity_aspect_responsible_id);
        if (!info.isNew) {
          this.deletedResponsibles.push(info.unity_aspect_responsible_id);
        }
    //   }
    // })
  }

  isCheckedAspect(info: any) {
    return this.selectedAspects.find(aspect => aspect.area_aspect_id === info.area_aspect_id);
  }
  toggleAspect(info: any = {}, ev: any) {    
    if (ev.checked) {
      this.selectedAspects = [ ...this.selectedAspects, info ];
    } else {
      this.selectedAspects = this.selectedAspects.filter(aspect => aspect.area_aspect_id !== info.area_aspect_id);
    }
    if (this.selectedAspects.length === 0) this.aspectInvalid = true;
    else this.aspectInvalid = false;
  }
  
  save() {
    this.loader.open();
    try {
      this.saveResponsible(this.data.payload.customer_unity_id).then(async () => {
        await this.deleteResponsibles();
        this.loader.close();
        this.snackBar.open("Recorded Responsibles data successfully", "", { duration: 3000 });
        this.dialogRef.close();   
      })
    } catch (error) {
      this.loader.close();
      this.snackBar.open("Error in recording Responsible: "+ error, "", { duration: 5000 })      
    }
  }

  async deleteResponsibles() {
    for (let i = 0; i < this.deletedResponsibles.length; i ++) {
      await this.crudService.DeleteParams(this.deletedResponsibles[i], '/customerunity/responsibles').toPromise();
    }
  }

  async saveResponsible(customer_unity_id) {
    for (let i = 0; i < this.responsibles.length; i ++) {
      if (this.responsibles[i].isNew) {
        const newResponsible = {
          customer_unity_id,
          unity_aspect_responsible_name: this.responsibles[i].unity_aspect_responsible_name,
          unity_aspect_responsible_email: this.responsibles[i].unity_aspect_responsible_email
        } 
        const resResponsible = await this.crudService.Save(newResponsible, true, `/customerunity/responsibles`, null).toPromise();
        const { unity_aspect_responsible_id } = resResponsible.body;
        
        for (let j = 0; j < this.responsibles[i].aspects.length; j ++) {
          const newResAspect = {
            area_aspect_id: this.responsibles[i].aspects[j].area_aspect_id,
            unity_aspect_responsible_id
          }
          await this.crudService.Save(newResAspect, true, '/customerunity/responsibleaspects', null).toPromise();
        }
      }
    }
  }

    

}
