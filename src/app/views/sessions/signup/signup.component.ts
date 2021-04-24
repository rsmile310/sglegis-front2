import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Md5 } from "md5-typescript";

import { AppInformationService } from '../../../services/dialogs/app-information/app-information.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup
  constructor(
    private _router: Router,
    private _confirmService: AppInformationService) { }

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password,
      confirmPassword: confirmPassword,
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true }
        }
        return null;
      })
    });
  }

  signup() {
    const signupData = this.signupForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    // this._conta.CriarConta(signupData.email, Md5.init(signupData.password)).subscribe(retorno => {
    //   if (retorno.Status === "OK") {
    //     this._confirmService.information("SISTEMA", retorno.Mensagem);
    //     this._router.navigate(["/sessao/entrar"]);
    //   } else {
    //     //this._msg.confirm("Erro ao fazer o login", "Não foi possivel efetuar o login:"+ retorno.Mensagem);        
    //     this._confirmService.information("Erro ao criar nova conta - RB Sistemas", retorno.Mensagem);
    //     this._router.navigate(["/sessao/entrar"]);
    //   }
    // });
  }
}
