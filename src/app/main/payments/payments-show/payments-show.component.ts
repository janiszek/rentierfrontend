import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Bill } from 'src/app/Model/bills';
import { RentLocation } from 'src/app/Model/locations';
import { Contract } from 'src/app/Model/contracts';
import { Tenant } from 'src/app/Model/tenants';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';
import { Payment } from '../../../Model/payments';
import { PaymentsService } from 'src/app/Services/Payments/payments.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { PaymentAddeditComponent } from '../payment-addedit/payment-addedit.component';

@Component({
  selector: 'app-payments-show',
  templateUrl: './payments-show.component.html',
  styleUrls: ['./payments-show.component.css']
})
export class PaymentsShowComponent implements OnInit {

  private locationID: number;
  displayedColumns: string[] = ['date', 'amount', 'status'];
  dataSource: MatTableDataSource<Payment>;
  paymentList: Payment[];
  paymentTotals: Payment[];

  /*locationSelected: RentLocation = new RentLocation(0, '.', '.', '.');
  contractSelected: Contract = new Contract(0, '.', '.', '.', 0, 0);
  tenantSelected: Tenant = new Tenant(0, '.', '.', '.', '.', '.', '.', '.', '.', '.');*/

  locationSelected: RentLocation = null;
  contractSelected: Contract = null;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private locationService: LocationsService,
              private contractService: ContractsService, private paymentService: PaymentsService) {
  }

  /*ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.locationID = +params.id;
    });
    // just in case
    if (!this.locationID) {
      this.locationID = 1;
    }

    this.locationService.findLocationById(this.locationID).subscribe(location => {
      if (location !== null){
        this.locationSelected = location;
      }
    });
    this.contractService.findByLocationIdAndDateToAfterOrderByDateToDesc(this.locationSelected.id).subscribe(contract => {
      if (contract !== null){
        this.contractSelected = contract;
      }
    });
    if (this.contractSelected !== null){
      this.tenantService.findTenantById(this.contractSelected.tenant.id).subscribe(tenant => {
        // TODO to change
        if (tenant !== undefined){
          this.tenantSelected = tenant;
        }
      });
    }

    this.paymentService.findAllByLocationIdAndTenantIdOrderByDateAsc(this.locationSelected.id, this.tenantSelected.id).subscribe(bills => {
      this.paymentList = bills;
    });

    this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
    this.paymentTotals = this.paymentList.slice();

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }*/

  ngOnInit(): void {
    // just in case
    if (!this.locationID) {
      this.locationID = 0;
    }

    this.route.params.subscribe((params) => {
      this.locationID = +params.id;
      this.locationService.findLocationById(this.locationID).subscribe(location => {
        this.locationSelected = location;
        this.contractService.findByLocationIdAndDateToAfterOrderByDateToDesc(this.locationSelected.id).subscribe(contract => {
          if (contract !== null) {
            this.contractSelected = contract;
          }
          this.paymentService.findAllByLocationIdAndTenantIdOrderByDateAsc(this.locationSelected.id,
            this.contractSelected !== null ? this.contractSelected.tenant.id : 0).subscribe(payments => {
            this.paymentList = payments;

            this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
            this.paymentTotals = this.paymentList.slice();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        });
      });
    });
  }

  public calculateAmountTotal(): number {
    if (this.paymentTotals !== undefined) {
      return this.paymentTotals.reduce((accum, curr) => accum + curr.amount, 0);
    }
    else{
      return 0;
    }
  }

  onRowClicked(paymentRow: any){
    // alert('Row ID clicked: ' + row.id);
    this.editPayment(paymentRow);
  }

  editPayment({id, date, amount, status }: Payment) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id, date, amount, status
    };

    const dialogRef = this.dialog.open(PaymentAddeditComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        val => {
          // console.log('Dialog output:', val)
          if (val !== null){
            // TODO is there any better way?
            this.ngOnInit();
          }
        }
    );

}

}
