import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { Contract, ContractPage } from '../../Model/contracts';
import { Observable, of, throwError } from 'rxjs';
import { LocationsService } from '../Locations/locations.service';
import { TenantsService } from '../Tenants/tenants.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessagesService } from '../Messages/messages.service';
import { Message } from 'src/app/Model/message';
import { RentLocation } from 'src/app/Model/locations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  // private pathContracts = 'http://localhost:8080/contracts';
  private pathContracts = environment.backendUrl + '/contracts';


  private locationListLookup: string[] = ['<select location>'];
  private tenantListLookup: string[] = ['<select tenant>'];


  constructor(private httpClient: HttpClient, private locationService: LocationsService, private tenantService: TenantsService,
              private messageService: MessagesService) {

    // load data for filters
    this.locationService.getLocationShortNames().subscribe(shortNames => {
      shortNames.forEach(element => {
        this.locationListLookup.push(element);
      });
    });
    this.tenantService.getTenantShortNames().subscribe(shortNames => {
      shortNames.forEach(element => {
        this.tenantListLookup.push(element);
      });
    });


  }

  /*getContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.pathContracts)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }*/
  getContracts(): Observable<ContractPage> {
    return this.httpClient.get<ContractPage>(this.pathContracts)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }

  // find filtered contract http://localhost:8080/contracts/filter/{locationId}/{tenantId}
  /*getContractsFiltered(locationID: number, tenantID: number): Observable<Contract[]> {
    const contractFiltered: Contract[] = [];
    return this.httpClient.get<Contract[]>(this.pathContracts + `/filter/${locationID}/${tenantID}`);
  }*/

  getContractsFiltered(locationID: number, tenantID: number): Observable<ContractPage> {
    // return this.httpClient.get<ContractPage>(this.pathContracts + `/filter/${locationID}/${tenantID}`);
    return this.httpClient.get<ContractPage>(this.pathContracts + `/filterParam?locationId=${locationID}&tenantId=${tenantID}`)
    .pipe(
      catchError(err => {
        this.addErrorMessage(err);
        return throwError(err);
      })
    );
  }

  // find given contract http://localhost:8080/contracts/{contractId}
  findContractById(id: number): Observable<Contract> {
    if (id !== 0) {
      return this.httpClient.get<Contract>(this.pathContracts + `/${id}`);
    }
    else {
      return of(null);
    }
  }

  getLocationsLookup(): Observable<string[]> {
    return of(this.locationListLookup);
  }

  getTenantsLookup(): Observable<string[]> {
    return of(this.tenantListLookup);
  }

  public findByLocationIdAndDateToAfterOrderByDateToDesc(locationID: number): Observable<Contract> {
    return this.httpClient.get<Contract>(this.pathContracts + `/find-current/${locationID}`);
  }

  saveContract(id: number, contractItem: Contract): Observable<Contract> {
    if (id !== 0) {
      return this.httpClient.put<Contract>(this.pathContracts + `/${id}`, contractItem)
        .pipe(
          catchError(err => {
            this.addErrorMessage(err);
            return throwError(err);
          })
        );
    }
    else {
      return this.httpClient.post<Contract>(this.pathContracts, contractItem)
        .pipe(
          catchError(err => {
            this.addErrorMessage(err);
            return throwError(err);
          })
        );

    }
  }

  deleteContract(id: number): Observable<Contract> {
    return this.httpClient.delete<Contract>(this.pathContracts + `/${id}`)
    .pipe(
      catchError(err => {
        this.addErrorMessage(err);
        return throwError(err);
      })
    );
  }


  addErrorMessage(err: HttpErrorResponse) {
    this.messageService.add(new Message('message_warning', 'HTTP ERROR: ' + err.status + ' ' + err.message + '. ' +
      err.error.error + '. ' + err.error.message));
  }

}
