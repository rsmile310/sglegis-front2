import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { profile } from 'app/models/auth/profile.types';
import { roles } from 'app/models/auth/roles';
import { CampoBusca } from 'app/models/base/negocio/CampoBusca';
import { AppConfirmService } from 'app/services/dialogs/app-confirm/app-confirm.service';
import { AppLoaderService } from 'app/services/dialogs/app-loader/app-loader.service';
import { CRUDService } from 'app/services/negocio/CRUDService/CRUDService';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  public user: FormGroup;
  roles = roles;
  profile = profile;
  clients = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    private loader: AppLoaderService,
    private crudService: CRUDService,
    private snackBar: MatSnackBar,
    private confirm: AppConfirmService,
  ) { }

  ngOnInit() {
    this.prepareScreen(this.data.payload);
  }

  prepareScreen(record) {
    this.user = new FormGroup({
      user_id: new FormControl(record.user_id),
      user_email: new FormControl(record.user_email, [Validators.required, Validators.email]),
      user_name: new FormControl(record.user_name, [Validators.required]),
      user_profile_type: new FormControl(this.data.new ? profile.operacional : record.user_profile_type, [Validators.required]),
      user_role: new FormControl(this.data.new ? roles.client : record.user_role, [Validators.required]),
      is_disabled: new FormControl(record.is_disabled),
      client_id: new FormControl(record.client_id)
    });
    this.getUsers();
  }

  getUsers() {
    const params: [CampoBusca] = [
      new CampoBusca("user", "User", 50, "", "string", null, null, null)
    ]

    this.crudService.GetParamsSearch(params, "/users").subscribe(res => {     
      this.clients = [];
      if (!this.data.new) {
        this.clients = res.body.filter(c => c.user_id !== this.user.value.user_id);
      } else {
        this.clients = res.body;
      }
    })
  }

  saveUser() {
    let user = this.user.value;
    this.loader.open("Saving user");
    this.crudService.Save(user, this.data.new, "/users", user.user_id)
    .subscribe(res => {        
      this.loader.close();
      this.snackBar.open("Registro gravado com sucesso", "", { duration: 3000 });
      this.dialogRef.close();
    }, err => {
      this.loader.close();
      this.snackBar.open("Erro ao gravar registro: " + err, "", { duration: 5000 });
      this.dialogRef.close('NOK');      
    })
  }

  deleteUser() {
    let user = this.user.value;
    this.confirm.confirm("Exclusão - User", "Tem certeza que deseja excluir o User " + user.user_id).subscribe(result => {
      if (result === true) {
        this.loader.open("Excluindo - User");
        this.crudService.DeleteParams(user.user_id, "/users").subscribe(res => {
          this.snackBar.open("User excluído com sucesso!", "", { duration: 3000 });
          this.dialogRef.close("OK");
          this.loader.close();
        }, err => {
          this.loader.close();
          this.snackBar.open("Erro ao excluir User: " + err, "", { duration: 5000 });
        })
      }
    })
  }

  resetPassword() {
    let user = this.user.value;
    this.confirm.confirm("Password Reset", "A new password will be sent into " + user.user_email).subscribe(result => {
      if (result === true) {
        this.loader.open("Sending email");
        this.crudService.Save(user, this.data.new, "/users/reset-password", user.user_id).subscribe(res => {
          this.loader.close()
          this.snackBar.open("A new email sent successfully!", "", { duration: 5000 });
        }, err => {
          this.loader.close();
          this.snackBar.open("An error in sending email: " + err, "", { duration: 5000 });
        })
      }
    })
  }

  disableUser() {
    const user = {...this.user.value};
    console.log(user);
    
    user.is_disabled = user.is_disabled == 1 ? 0 : 1;
    this.confirm.confirm("Diable User", (user.is_disabled == 1 ? ("Will you disable this user : ") : ("Will you active this user : ")) + user.user_name).subscribe(result => {
      if (result === true) {
        this.loader.open();
        this.crudService.Save(user, this.data.new, "/users", user.user_id).subscribe(res => {
          this.loader.close();
          this.user.value.is_disabled = user.is_disabled;
          this.snackBar.open("An user has been disabled successfully", "", { duration: 5000 });
        }, err => {
          this.loader.close();
          this.snackBar.open("An error in disabling user!" + err, "", { duration: 5000 });
        })
      }
    })    
  }

}
