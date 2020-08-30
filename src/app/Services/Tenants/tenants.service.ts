import { Injectable } from '@angular/core';
import { Tenant, TenantPage } from '../../Model/tenants';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { MessagesService } from '../Messages/messages.service';
import { Message } from 'src/app/Model/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  // private pathTenants = 'http://localhost:8080/tenants';
  private pathTenants = environment.backendUrl + '/tenants';


  constructor(private httpClient: HttpClient, private messageService: MessagesService) {
  }

  public getTenants(): Observable<TenantPage> {
    return this.httpClient.get<TenantPage>(this.pathTenants)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }

  // find selected tenant http://localhost:8080/tenants/{tenantId}
  public findTenantById(id: number): Observable<Tenant> {
    if (id !== 0){
      return this.httpClient.get<Tenant>(this.pathTenants + `/${id}`);
    }
    else{
      return of(null);
    }
  }

  private ExtractShortNames(tenants: Tenant[]){
    const tenantShortNames: string[] = [];
    tenants.forEach(ten => {
        tenantShortNames.push(ten.shortName);
      });
    return(tenantShortNames);
  }

  public getTenantShortNames(): Observable<string[]> {
    return this.getTenants()
    .pipe(
      map(tenantPage => this.ExtractShortNames(tenantPage.content))
    );
  }

  public saveTenant(id: number, tenantItem: Tenant): Observable<Tenant> {
    if (id !== 0){
      return this.httpClient.put<Tenant>(this.pathTenants + `/${id}`, tenantItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
    else{
      return this.httpClient.post<Tenant>(this.pathTenants, tenantItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
  }

private addErrorMessage(err: HttpErrorResponse){
  this.messageService.add(new Message('message_warning', 'HTTP ERROR: ' + err.status + ' ' + err.message + '. ' +
  err.error.error + '. ' + err.error.message));
}

}
