import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Payment, paymentType } from 'src/app/Model/payments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from '../Messages/messages.service';
import { Message } from 'src/app/Model/message';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  // private pathPayments = 'http://localhost:8080/payments';
  private pathPayments = environment.backendUrl + '/payments';


  constructor(private httpClient: HttpClient, private messageService: MessagesService) {
  }

  // find given payment http://localhost:8080/payments/{paymentId}
  findPaymentById(id: number): Observable<Payment> {
    if (id !== 0) {
      return this.httpClient.get<Payment>(this.pathPayments + `/${id}`);
    }
    else {
      return of(null);
    }
  }

  findAllByLocationIdAndTenantIdOrderByDateAsc(locationID: number, tenantID: number): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(this.pathPayments + `/filter/${locationID}/${tenantID}`)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
  }

  savePayment(id: number, paymentItem: Payment): Observable<Payment> {
    if (id !== 0) {
      return this.httpClient.put<Payment>(this.pathPayments + `/${id}`, paymentItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
    else {
      return this.httpClient.post<Payment>(this.pathPayments, paymentItem)
      .pipe(
        catchError(err => {
          this.addErrorMessage(err);
          return throwError(err);
        })
      );
    }
  }

  deletePayment(id: number): void {
    this.httpClient.delete<Payment>(this.pathPayments + `/${id}`)
    .pipe(
      catchError(err => {
        this.addErrorMessage(err);
        return throwError(err);
      })
    );
  }

  addErrorMessage(err: HttpErrorResponse) {
    this.messageService.add(new Message('message_warning', 'HTTP ERROR: ' + err.status + ' ' + err.message));
  }
}

