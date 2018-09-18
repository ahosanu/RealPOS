import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RePrintComponent } from './re-print.component';

describe('RePrintComponent', () => {
  let component: RePrintComponent;
  let fixture: ComponentFixture<RePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
