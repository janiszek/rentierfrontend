import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Contract } from 'src/app/Model/contracts';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { LocationValidationService, TenantValidationService, DatesValidationService } from 'src/app/Services/custom-validators';

@Component({
  selector: 'app-contract-addedit',
  templateUrl: './contract-addedit.component.html',
  styleUrls: ['./contract-addedit.component.css']
})
export class ContractAddeditComponent implements OnInit {

  locationList: string[];
  tenantList: string[];

  errorMessage = '';

  public contractEditForm = new FormGroup({
    id: new FormControl(''),
    dateContract: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    locationID: new FormControl(''),
    tenantID: new FormControl('')
  });

  public contractId: number;
  private contract: Contract = new Contract(0, null, null, null, 0, 0);

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
              private location: Location, private contractService: ContractsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // get the list of locations and tenants for the lookup control
      this.contractService.getLocationsLookup().subscribe(locations => {
        this.locationList = locations;
      });
      this.contractService.getTenantsLookup().subscribe(tenants => {
        this.tenantList = tenants;
      });

      if (params.id) {
        this.contractId = +params.id;
      }
      if (this.contractId) {
        this.contractService.findContractById(this.contractId).subscribe((contract) => {
          this.contract = contract;

          this.contractEditForm = this.fb.group({
            id: [this.contract.id],
            dateContract: [this.contract.dateContract, Validators.required],
            dateFrom: [this.contract.dateFrom, Validators.required],
            dateTo: [this.contract.dateTo, Validators.required],
            locationID: [{ value: this.contract.location.id, disabled: this.contract.id > 0 },
            [Validators.required, LocationValidationService.locationValidator]],
            tenantID: [{ value: this.contract.tenant.id, disabled: this.contract.id > 0 },
            [Validators.required, TenantValidationService.tenantValidator]]
          },
            {
              validator: DatesValidationService.compareDates('dateFrom', 'dateTo')
            }
          );

          this.contractEditForm.valueChanges.subscribe(form => {
            if (form) {
              this.contractEditControlValidator(form);
            }
          });
        });
      }
    });
  }

  private contractEditControlValidator(form) {
    // custom validations for form controls
    if (form) {
      if (!this.contractEditForm.valid) {
        this.errorMessage = 'All fields are required. "Valid to" needs to be later than "Valid from". ';
      }
      else {
        this.errorMessage = '';
      }
    }
  }

  public onSubmit() {
    // verify changes only if edited
    if (this.contractEditForm.valid && (this.contractEditForm.dirty || this.contractEditForm.touched)) {
      this.contract.dateContract = this.contractEditForm.value.dateContract;
      this.contract.dateFrom = this.contractEditForm.value.dateFrom;
      this.contract.dateTo = this.contractEditForm.value.dateTo;
      if (this.contractEditForm.value.locationID !== undefined){
        this.contract.location.id = this.contractEditForm.value.locationID;
      }
      if (this.contractEditForm.value.tenantID !== undefined){
        this.contract.tenant.id =  this.contractEditForm.value.tenantID;
      }
      this.contractService.saveContract(this.contract.id, this.contract).subscribe(con => {
        this.contract = con;
        this.router.navigate(['contracts']);
      });

    }
  }

  onCancel(event: any): void {
    this.contractEditForm.reset();
    this.location.back();
  }

}
