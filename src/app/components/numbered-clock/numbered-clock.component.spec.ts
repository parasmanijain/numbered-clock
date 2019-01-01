import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberedClockComponent } from './numbered-clock.component';

describe('NumberedClockComponent', () => {
  let component: NumberedClockComponent;
  let fixture: ComponentFixture<NumberedClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberedClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberedClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
