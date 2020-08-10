import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsShowComponent } from './payments-show.component';

describe('PaymentsShowComponent', () => {
  let component: PaymentsShowComponent;
  let fixture: ComponentFixture<PaymentsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
