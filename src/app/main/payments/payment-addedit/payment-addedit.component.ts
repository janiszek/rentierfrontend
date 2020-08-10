import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Payment } from '../../../Model/payments';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentsService } from 'src/app/Services/Payments/payments.service';

@Component({
  selector: 'app-payment-addedit',
  templateUrl: './payment-addedit.component.html',
  styleUrls: ['./payment-addedit.component.css']
})
export class PaymentAddeditComponent implements OnInit {

  form: FormGroup;
  paymentId: number;
  private payment: Payment = new Payment(0, null, null, null, null, null);

  constructor(private paymentService: PaymentsService, private fb: FormBuilder,
              private dialogRef: MatDialogRef<PaymentAddeditComponent>,
              @Inject(MAT_DIALOG_DATA) { id, date, amount, status }: Payment) {
    this.paymentId = id;

    this.form = fb.group({
      date: [date, Validators.required],
      amount: [amount, Validators.required],
      /*releasedAt: [moment(), Validators.required],*/
      status: [status, Validators.required]
    });

  }

  ngOnInit(): void {
    if (this.paymentId) {
      this.paymentService.findPaymentById(this.paymentId).subscribe((payment) => {
        this.payment = payment;
      });
    }
  }

  save() {
    // save changes only if edited
    // TO DO - why this form is always this.form.touched == TRUE???
    // if (this.form.valid && (this.form.dirty || this.form.touched)) {
    if (this.form.valid && this.form.dirty ) {
      if (this.paymentId !== 0){
        /*const payment: Payment = new Payment(0, this.form.value.shortName, this.form.value.firstName, this.form.value.lastName,
          this.form.value.pesel, this.form.value.documentId, this.form.value.address,
          this.form.value.email, this.form.value.phone, this.form.value.description);*/
          this.payment.date = this.form.value.date;
          this.payment.amount = this.form.value.amount;
          this.payment.status = this.form.value.status;
          this.paymentService.savePayment(this.paymentId, this.payment).subscribe(pay => {
          this.payment = pay;
        });
      }
    }
    // TODO save the values
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
