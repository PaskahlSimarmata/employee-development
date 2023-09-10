import { Injectable } from '@angular/core';
import { EmployeeResponse } from './employee.type';
import { dataEmployee } from '../shared/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor() {}
  
  getData(): EmployeeResponse[] {
    return dataEmployee;
  }
  
  addData(newData: EmployeeResponse) {
    dataEmployee.push(newData);
  }

  getDetailData(data:EmployeeResponse){
    this.dataSubject.next(data);
  }

}
