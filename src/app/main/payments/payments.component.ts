import { Component, OnInit } from '@angular/core';
import { RentLocation } from 'src/app/Model/locations';
import { Contract } from 'src/app/Model/contracts';
import { Tenant } from 'src/app/Model/tenants';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  locationList: RentLocation[] = [];
  currentContractList: Contract[] = [];
  /*currentTenantList: Tenant[] = [];*/

  constructor(private locationService: LocationsService, private contractService: ContractsService,
              /*private tenantService: TenantsService*/) {
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(locationPage => {
      this.locationList = locationPage.content;
      this.locationList.forEach(location => {
        this.contractService.findByLocationIdAndDateToAfterOrderByDateToDesc(location.id).subscribe(contract => {
          this.currentContractList.push(contract);
        });
      });
    });
  }

}
