import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeResponse, FilterResponse } from '../employee.type';
import { dataEmployee } from 'src/app/shared/data';
import { EmployeeService } from '../employee.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-index',
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.scss'],
})
export class EmployeeIndexComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'username',
    'fisrtName',
    'email',
    'basicSalary',
    'status',
    'group',
    'action',
  ];

  inputForm!: FormGroup;

  filterField?: FilterResponse;

  dataSource!: MatTableDataSource<EmployeeResponse>;

  constructor(
    private employeeService: EmployeeService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      username: new FormControl<string>(''),
      name: new FormControl<string>(''),
      status: new FormControl<string>(''),
      group: new FormControl<string>(''),
    });

    if (localStorage.getItem('filter')) {
      this.filterField = JSON.parse(String(localStorage.getItem('filter')));
      this.inputForm.patchValue({
        username: this.filterField?.username,
        name: this.filterField?.name,
        status: this.filterField?.status,
        group: this.filterField?.group,
      });
    }
    setTimeout(() => {
      this.applyFilter();
    }, 1000);
    this.getData();
  }

  filter() {
    this.applyFilter();
    localStorage.setItem('filter', JSON.stringify(this.inputForm.value));
  }

  resetForm() {
    this.inputForm.reset();
    localStorage.removeItem('filter');
    this.applyFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.dataSource = new MatTableDataSource(this.employeeService.getData());
  }
  filterData() {
    const filterValue = this.inputForm
      .get('username')
      ?.value.trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  applyFilter() {
    const groupFilter = this.inputForm.get('group')?.value?.trim() ||"";
    const statusFilter = this.inputForm.get('status')?.value?.trim() ||"";
    const firstnameFilter = this.inputForm.get('name')?.value?.trim() ||"";
    const usernameFilter = this.inputForm.get('username')?.value?.trim() ||"";
    
    const filteredData = this.employeeService.getData().filter((data) => {
      return (
        (!groupFilter ||
          data.group.toLowerCase().includes(groupFilter.toLowerCase())) &&
        (!statusFilter || data.status === statusFilter) &&
        (!firstnameFilter ||
          data.fisrtName
            .toLowerCase()
            .includes(firstnameFilter.toLowerCase())) &&
        (!usernameFilter ||
          data.username.toLowerCase().includes(usernameFilter.toLowerCase()))
      );
    });
    this.dataSource.data = filteredData;
  }

  showNotification(value: string) {
    const notification = document.createElement('div');
    notification.classList.add(
      'fixed',
      'bottom-0',
      'm-4',
      'p-3',
      'cursor-pointer',
      'text-white',
      'rounded-md',
      'shadow-md',
      'transition-transform',
      'transform',
      '-translate-y-full'
    );
    if (value == 'edit') {
      notification.classList.add('bg-yellow-500');
      notification.textContent =
        'ini adalah dummy button untuk edit, Klik untuk menutup';
    } else {
      notification.classList.add('bg-red-500');
      notification.textContent =
        'ini adalah dummy button untuk Hapus, Klik untuk menutup';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        notification.remove();
      }, 100);
    });
  }

  sendData(value: EmployeeResponse) {
    this.employeeService.getDetailData(value);
    this.router.navigate(['employee/detail']);
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
