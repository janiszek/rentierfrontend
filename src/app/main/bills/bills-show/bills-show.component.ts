import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bill } from 'src/app/Model/bills';
import { BillsService } from 'src/app/Services/Bills/bills.service';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/Model/contracts';
import { Tenant } from 'src/app/Model/tenants';
import { RentLocation } from 'src/app/Model/locations';
import { LocationsService } from 'src/app/Services/Locations/locations.service';
import { ContractsService } from 'src/app/Services/Contracts/contracts.service';
import { TenantsService } from 'src/app/Services/Tenants/tenants.service';


@Component({
  selector: 'app-bills-show',
  templateUrl: './bills-show.component.html',
  styleUrls: ['./bills-show.component.css']
})
export class BillsShowComponent implements OnInit {

  private locationID: number;
  displayedColumns: string[] = ['date', 'amount', 'status', 'billGroup'];
  dataSource: MatTableDataSource<Bill>;
  billList: Bill[];
  billTotals: Bill[];

  locationSelected: RentLocation = null;
  contractSelected: Contract = null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private locationService: LocationsService, private contractService: ContractsService,
              private billService: BillsService) {
  }

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
          this.billService.findAllByLocationIdOrderByDateAscBillGroupAsc(this.locationSelected.id).subscribe(billPage => {
            this.billList = billPage.content;

            this.dataSource = new MatTableDataSource<Bill>(this.billList);
            this.billTotals = this.billList.slice();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
        });
      });
    });
  }

  public calculateAmountTotal(): number {
    if (this.billTotals !== undefined) {
      return this.billTotals.reduce((accum, curr) => accum + curr.amount, 0);
    }
    else {
      return 0;
    }
  }

  onRowClicked(row: any) {
    alert('Row ID clicked: ' + row.id);
  }

}
