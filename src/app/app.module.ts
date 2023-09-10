import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { EmployeeIndexComponent } from './employee/employee-index/employee-index.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [MatIconRegistry, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
