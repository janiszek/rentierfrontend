import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LocationsComponent } from './main/locations/locations.component';
import { TenantsComponent } from './main/tenants/tenants.component';
import { ContractsComponent } from './main/contracts/contracts.component';
import { BillsComponent } from './main/bills/bills.component';
import { PaymentsComponent } from './main/payments/payments.component';
import { TenantAddeditComponent } from './main/tenants/tenant-addedit/tenant-addedit.component';
import { ContractAddeditComponent } from './main/contracts/contract-addedit/contract-addedit.component';
import { BillsShowComponent } from './main/bills/bills-show/bills-show.component';
import { PaymentsShowComponent } from './main/payments/payments-show/payments-show.component';
import { AboutusComponent } from './main/aboutus/aboutus.component';


const routes: Routes = [
  {path: '', redirectTo: '/aboutus', pathMatch: 'full'},
  {path: 'locations', component: LocationsComponent},
  {path: 'tenants', component: TenantsComponent},
  {path: 'tenants/:id/edit', component: TenantAddeditComponent},
  {path: 'tenants/addnew', component: TenantAddeditComponent},
  {path: 'contracts', component: ContractsComponent},
  {path: 'contracts/:id/edit', component: ContractAddeditComponent},
  {path: 'contracts/addnew', component: ContractAddeditComponent},
  {path: 'bills', component: BillsComponent},
  {path: 'bills/:id/show', component: BillsShowComponent},
  {path: 'payments', component: PaymentsComponent},
  {path: 'payments/:id/show', component: PaymentsShowComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
