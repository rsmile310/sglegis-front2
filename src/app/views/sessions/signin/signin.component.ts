import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Md5 } from "md5-typescript";
import { AUTHService } from 'app/services/negocio/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  dataformatada: string;

  signinForm: FormGroup;

  initialErrors: {
    user_email: '123',
    user_password: null
  }  

  constructor(
    private _router: Router,
    private snackBar: MatSnackBar,
    private auth: AUTHService) { }

  ngOnInit() {       
    localStorage.clear();
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  signin() {
    const signinData = this.signinForm.value;
    const { email, password } = signinData;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.auth.login(email, password).subscribe(res => {
      const { token, user } = res;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));      
      this.progressBar.mode = "determinate";
      this._router.navigate(['/cadastros'])
    }, ({ error: errors }) => {
      this.progressBar.mode = "determinate"
      Object.keys(errors).forEach(key => {
        this.signinForm.controls[key].setErrors({ 'error': errors[key] });
      })
    })
  }
}






