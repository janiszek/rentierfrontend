import { Injectable } from '@angular/core';
import { Bill, billType } from '../../Model/bills';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessagesService } from '../Messages/messages.service';
import { Message } from 'src/app/Model/message';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class BillsService {

  // private pathBills = 'http://localhost:8080/bills';
  private pathBills = environment.backendUrl + '/bills';


  constructor(private httpClient: HttpClient, private messageService: MessagesService) {
  }

  findAllByLocationIdOrderByDateAscBillGroupAsc(locationID: number): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.pathBills + `/filter/${locationID}`)
    .pipe(
      catchError(err => {
        this.addErrorMessage(err);
        return throwError(err);
      })
    );
  }

  saveBill(id: number, billItem: Bill): Observable<Bill> {
    if (id !== 0){
      return this.httpClient.put<Bill>(this.pathBills + `/${id}`, billItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
    else{
      return this.httpClient.post<Bill>(this.pathBills, billItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
  }

  deleteBill(id: number): void {
    this.httpClient.delete<Bill>(this.pathBills + `/${id}`)
    .pipe(
      catchError(err => {
        this.addErrorMessage(err);
        return throwError(err);
      })
    );
  }

  addErrorMessage(err: HttpErrorResponse){
    this.messageService.add(new Message('message_warning', 'HTTP ERROR: ' + err.status + ' ' + err.message));
  }

}
