import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddeditComponent } from './contract-addedit.component';

describe('ContractAddeditComponent', () => {
  let component: ContractAddeditComponent;
  let fixture: ComponentFixture<ContractAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
