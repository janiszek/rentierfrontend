import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LocationsComponent } from './main/locations/locations.component';
import { TenantsComponent } from './main/tenants/tenants.component';
import { ContractsComponent } from './main/contracts/contracts.component';
import { BillsComponent } from './main/bills/bills.component';
import { PaymentsComponent } from './main/payments/payments.component';
import { TenantAddeditComponent } from './main/tenants/tenant-addedit/tenant-addedit.component';
import { NG_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMinValueDirective, AppValidProductNameDirective, AppMaxValueDirective } from './Services/custom-validators';
import { ContractAddeditComponent } from './main/contracts/contract-addedit/contract-addedit.component';
import { BillsShowComponent } from './main/bills/bills-show/bills-show.component';
import { PaymentsShowComponent } from './main/payments/payments-show/payments-show.component';
import { PaymentAddeditComponent } from './main/payments/payment-addedit/payment-addedit.component';
import { MessageComponent } from './message/message.component';
import { AboutusComponent } from './main/aboutus/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    AboutusComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PagenotfoundComponent,
    LocationsComponent,
    TenantsComponent,
    ContractsComponent,
    BillsComponent,
    PaymentsComponent,
    TenantAddeditComponent,
    ContractAddeditComponent,
    BillsShowComponent,
    PaymentsShowComponent,
    PaymentAddeditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {provide: NG_VALIDATORS, useExisting: AppValidProductNameDirective, multi: true},
    {provide: NG_VALIDATORS, useExisting: AppMinValueDirective, multi: true},
    {provide: NG_VALIDATORS, useExisting: AppMaxValueDirective, multi: true},
    MatDatepickerModule,
    // define the display format of the MatDatePicker component
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
