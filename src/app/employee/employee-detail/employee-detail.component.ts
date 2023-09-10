import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { EmployeeResponse } from '../employee.type';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  EmployeeData?: EmployeeResponse;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.data$.subscribe((data: EmployeeResponse) => {
      if (data) {
        this.EmployeeData = data
      } else {
        this.router.navigate(['employee'])
      }
    });
  }
}
