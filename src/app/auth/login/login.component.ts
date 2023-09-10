import { Component, OnInit } from '@angular/core';
import { AuthResponse } from '../auth.type';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signUpUsers!: string | null;

  loginObj!: AuthResponse;

  inputForm!: FormGroup;

  credential: any[] = [];

  constructor(private _snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl<string>(''),
      password: new FormControl<string>(''),
    });
    this.signUpUsers = localStorage.getItem('signUpUsers');
  }

  doLogin() {
    const newArray = JSON.parse(String(this.signUpUsers));
    if(!newArray){
      this._snackbar.open('Incorrect username/password','',{duration:1500})
      return
    }
    const isUserExist = newArray.find(
      (m: any) =>
        m.username == this.inputForm.get('username')?.value &&
        m.password == this.inputForm.get('password')?.value
    );
    if (this.inputForm.valid) {
      if (isUserExist) {
        this.router.navigate(['/employee'])
        this._snackbar.open('successfully logged in', '', { duration: 1500 });
      } else {
        this._snackbar.open('Incorrect username/password', '', {
          duration: 1500,
        });
      }
    } else {
      this._snackbar.open('username / password cannot be empty', '', {
        duration: 1500,
      });
    }
  }
}
