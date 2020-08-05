import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSplitComponent } from './first-split.component';

describe('FirstSplitComponent', () => {
  let component: FirstSplitComponent;
  let fixture: ComponentFixture<FirstSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
