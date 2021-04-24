import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Md5 } from "md5-typescript";


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

  constructor(
    private _router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    localStorage.clear();
    this.signinForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  signin() {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

  }

}






