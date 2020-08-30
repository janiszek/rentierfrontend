import { Component, OnInit } from '@angular/core';
import { RentLocation } from 'src/app/Model/locations';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { Contract } from 'src/app/Model/contracts';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { Tenant } from 'src/app/Model/tenants';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  locationList: RentLocation[] = [];
  currentContractList: Contract[] = [];

  constructor(private locationService: LocationsService, private contractService: ContractsService) {
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
