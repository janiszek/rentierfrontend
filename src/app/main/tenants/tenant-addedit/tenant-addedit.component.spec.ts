import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantAddeditComponent } from './tenant-addedit.component';

describe('TenantAddeditComponent', () => {
  let component: TenantAddeditComponent;
  let fixture: ComponentFixture<TenantAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
