import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsShowComponent } from './bills-show.component';

describe('BillsShowComponent', () => {
  let component: BillsShowComponent;
  let fixture: ComponentFixture<BillsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
