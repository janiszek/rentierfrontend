import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { Contract, ContractPage } from 'src/app/Model/contracts';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  /*contractList: Contract[];*/
  contractPage: ContractPage;

  locationList: string[];
  tenantList: string[];
  locationSelected = 0;
  tenantSelected = 0;


  constructor(private contractService: ContractsService) { }

  ngOnInit(): void {
    // get the list of locations and tenants for the lookup control
    this.contractService.getLocationsLookup().subscribe(locations => {
      this.locationList = locations;
    });
    this.contractService.getTenantsLookup().subscribe(tenants => {
      this.tenantList = tenants;
    });

    if (this.locationSelected !== 0 || this.tenantSelected !== 0) {
      this.contractService.getContractsFiltered(this.locationSelected, this.tenantSelected)
        .subscribe(contractPage => {
          this.contractPage = contractPage;
        });
    }
    else {
      /*this.contractService.getContracts().subscribe(contracts => {
        this.contractList = contracts;
      });*/

      // use the pagination by default
      this.contractService.getContracts().subscribe(contractPage => {
        this.contractPage = contractPage;
      });
    }
  }

  onChangeLocation(event: any): void {
    // alert('Filter selected');
    if (event.target.value !== this.locationList[0]){
      this.locationSelected = this.locationList.indexOf(event.target.value);
    }
    else{
      this.locationSelected = 0;
    }
    this.ngOnInit();
  }

  onChangeTenant(event: any): void {
    if (event.target.value !== this.tenantList[0]){
      this.tenantSelected = this.tenantList.indexOf(event.target.value);
    }
    else{
      this.tenantSelected = 0;
    }
    this.ngOnInit();
  }

  deleteContractClick(contractId: number) {
    this.contractService.deleteContract(contractId).subscribe(cont => {
      this.ngOnInit();
    });
  }

}
