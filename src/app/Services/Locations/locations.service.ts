import { Injectable } from '@angular/core';
import { RentLocation, RentLocationPage } from '../../Model/locations';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from '../Messages/messages.service';
import { Message } from 'src/app/Model/message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  // private pathLocations = 'http://localhost:8080/locations';
  private pathLocations = environment.backendUrl + '/locations';

  constructor(private httpClient: HttpClient, private messageService: MessagesService) {
  }

  /*getLocations(): Observable<RentLocation[]> {
    return this.httpClient.get<RentLocation[]>(this.pathLocations)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }*/
  getLocations(): Observable<RentLocationPage> {
    return this.httpClient.get<RentLocationPage>(this.pathLocations)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }

  // find selected location http://localhost:8080/locations/{locationId}
  findLocationById(id: number): Observable<RentLocation> {
    return this.httpClient.get<RentLocation>(this.pathLocations + `/${id}`);
  }

  private ExtractShortNames(locations: RentLocation[]){
    const locationShortNames: string[] = [];
    locations.forEach(loc => {
        locationShortNames.push(loc.shortName);
      });
    return(locationShortNames);
  }

  public getLocationShortNames(): Observable<string[]> {
    return this.getLocations()
    .pipe(
      map(locationPage => this.ExtractShortNames(locationPage.content))
    );
  }

  addErrorMessage(err: HttpErrorResponse){
    this.messageService.add(new Message('message_warning', 'HTTP ERROR: ' + err.status + ' ' + err.message + '. ' +
    err.error.error + '. ' + err.error.message));

  }

}
