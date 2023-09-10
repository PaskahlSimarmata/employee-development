import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { dataEmployee } from 'src/app/shared/data';
import { EmployeeResponse } from '../employee.type';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

const newData: EmployeeResponse = {
  username: 'paskahl',
  fisrtName: 'Sodium',
  lastName: 'herbert',
  email: 'Na',
  birthDate: '23-04-2000',
  basicSalary: 1000000,
  status: 'active',
  group: 'A',
  description: '23-04-2000',
};

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
  inputForm!: FormGroup;

  @Output() dataAdded = new EventEmitter<EmployeeResponse>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      fisrtName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', Validators.email),
      birthDate: new FormControl<string>('', Validators.required),
      basicSalary: new FormControl<number | null>(null, Validators.required),
      status: new FormControl<string>('', Validators.required),
      group: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
    });
  }

  isDateValid(dateString: string): boolean {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return inputDate <= currentDate;
  }

  addNewEmployee() {
    const birtDateValid = this.inputForm.get('birthDate')?.value;
    const descriptionValid = this.inputForm.get('description')?.value;
    const emailValid = this.inputForm.get('email')?.valid;
    if (
      !this.isDateValid(birtDateValid) ||
      !this.isDateValid(descriptionValid)
    ) {
      // Tampilkan pesan kesalahan atau lakukan tindakan lain sesuai kebutuhan
      this._snackbar.open('The date you entered is invalid', '', {
        duration: 1500,
      });
      return;
    }
    if (!emailValid) {
      this._snackbar.open('email format is wrong', '', { duration: 15000 });
      return
    }
    if (this.inputForm.valid) {
      this._snackbar.open('Berhasil Menambahkan data', '', { duration: 1500 });
      this.dataAdded.emit(this.inputForm.value);
      this.employeeService.addData(this.inputForm.value);
      this.router.navigate(['employee']);
    } else {
      this._snackbar.open(
        'All data is mandatory, please fill in all data correctly',
        '',
        { duration: 1500 }
      );
    }
  }

  dataTest = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  selectedItem = '';
  filteredData: string[] = [];

  filterItems() {
    const groupFilter = this.inputForm.get('group')?.value;
    if (groupFilter) {
      this.filteredData = this.dataTest.filter((item) =>
        item.toLowerCase().includes(groupFilter.toLowerCase())
      );
    } else {
      this.filteredData = this.dataTest;
    }
  }

  fillData() {
    this.filteredData = this.dataTest;
  }

  setItem(data: string) {
    this.inputForm.patchValue({
      group: data,
    });
    this.filteredData = [];
  }
}
