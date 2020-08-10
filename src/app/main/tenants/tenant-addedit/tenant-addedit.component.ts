import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Tenant } from 'src/app/Model/tenants';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentsShowComponent } from '../../payments/payments-show/payments-show.component';

@Component({
  selector: 'app-tenant-addedit',
  templateUrl: './tenant-addedit.component.html',
  styleUrls: ['./tenant-addedit.component.css']
})
export class TenantAddeditComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  tenantId: number;
  tenant: Tenant = new Tenant(0, '', null, null, null, null, null, null, null, null);

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
              private tenantService: TenantsService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // https://scotch.io/tutorials/javascript-unary-operators-simple-and-useful
      this.tenantId = +params.id;
      if (this.tenantId) {
        this.tenantService.findTenantById(this.tenantId).subscribe(tenant => {
          this.tenant = tenant;
        });
      }
    });
  }


  onSubmit() {
    /*// model danych formularza
    console.log('submitted', this.tenant);
    // dane z formularza
    console.log('form.value', this.form.value);
    // czy formularz spełnia warunki walidacji
    console.log('form.valid', this.form.valid);
    // czy dane formularza zostały zmienione przez użytkownika
    console.log('form.dirty', this.form.dirty);
    // czy formularz został "dotknięty" przez użytkownika (próbował zmienić dane, ale niekoniecznie zmienił wartości)
    console.log('form.touched', this.form.touched);*/

    // save changes only if edited
    if (this.form.valid && (this.form.dirty || this.form.touched)) {
      /*if (this.tenant.id === 0) {
        const tenant: Tenant = new Tenant(0, this.form.value.shortName, this.form.value.firstName, this.form.value.lastName,
          this.form.value.pesel, this.form.value.documentId, this.form.value.address,
          this.form.value.email, this.form.value.phone, this.form.value.description);
        this.tenantService.addTenant(tenant).subscribe(ten => {
          this.tenant = ten;
          this.router.navigate(['tenants']);
        });
      }
      else {
        const tenant: Tenant = new Tenant(this.tenant.id, this.tenant.shortName, this.form.value.firstName, this.form.value.lastName,
          this.form.value.pesel, this.form.value.documentId, this.form.value.address,
          this.form.value.email, this.form.value.phone, this.form.value.description);
        this.tenantService.updateTenant(this.tenant.id, tenant).subscribe(ten => {
          this.tenant = ten;
          this.router.navigate(['tenants']);
        });
      }*/
      // TODO encapsulate the tenant object details
      this.tenant.shortName = this.tenant.id === 0 ? this.form.value.shortName : this.tenant.shortName;
      this.tenant.details.firstName = this.form.value.firstName;
      this.tenant.details.lastName = this.form.value.lastName;
      this.tenant.details.pesel = this.form.value.pesel;
      this.tenant.details.documentId = this.form.value.documentId;
      this.tenant.details.address = this.form.value.address;
      this.tenant.details.email = this.form.value.email;
      this.tenant.details.phone = this.form.value.phone;
      this.tenant.details.description = this.form.value.description;
      this.tenantService.saveTenant(this.tenant.id, this.tenant).subscribe(ten => {
        this.tenant = ten;
        this.router.navigate(['tenants']);
      });
      /*this.router.navigate(['tenants']);*/
    }
  }

  onCancel(event: any): void {
    this.form.reset();
    this.location.back();
  }

}
