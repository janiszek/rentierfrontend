import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAddeditComponent } from './payment-addedit.component';

describe('PaymentAddeditComponent', () => {
  let component: PaymentAddeditComponent;
  let fixture: ComponentFixture<PaymentAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
