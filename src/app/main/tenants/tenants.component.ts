import { Component, OnInit } from '@angular/core';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';
import { Tenant, TenantPage } from 'src/app/Model/tenants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  /*tenantList: Tenant[];*/
  tenantPage: TenantPage;

  constructor(private router: Router, private tenantService: TenantsService) {

  }

  ngOnInit(): void {
    this.tenantService.getTenants().subscribe(tenantPage => {
      this.tenantPage = tenantPage;
    });
  }

}
