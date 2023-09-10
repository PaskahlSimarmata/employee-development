import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../auth.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeResponse } from 'src/app/employee/employee.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  inputForm!: FormGroup;

  existingData!: string | null;

  users: AuthResponse[] = [];

  constructor(private _snackbar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.minLength(6)),
    });
    this.existingData = localStorage.getItem('signUpUsers');
  }

  doRegister() {
    const passwordControl = this.inputForm.get('password');
    const usernameControl = this.inputForm.get('username');
    if (this.inputForm.valid) {
      if (this.existingData) {
        this.users = JSON.parse(String(this.existingData));
        this.users.push(this.inputForm.value);
        localStorage.setItem('signUpUsers', JSON.stringify(this.users));
      } else {
        this.users.push(this.inputForm.value);
        localStorage.setItem('signUpUsers', JSON.stringify(this.users));
      }
      this._snackbar.open('Successfully created an account', '', {
        duration: 1500,
      });
      this.router.navigate(['auth/login']);
    } else {
      if (
        usernameControl?.value &&
        passwordControl?.value &&
        passwordControl.errors
      ) {
        this._snackbar.open(
          'The password must contain a minimum of 6 letters',
          '',
          {
            duration: 1500,
          }
        );
      } else {
        this._snackbar.open('username / password cannot be empty', '', {
          duration: 1500,
        });
      }
    }
  }
}
