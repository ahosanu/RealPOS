import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpAlertComponent } from './exp-alert.component';

describe('ExpAlertComponent', () => {
  let component: ExpAlertComponent;
  let fixture: ComponentFixture<ExpAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
