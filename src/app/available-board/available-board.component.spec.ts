import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableBoardComponent } from './available-board.component';

describe('AvailableBoardComponent', () => {
  let component: AvailableBoardComponent;
  let fixture: ComponentFixture<AvailableBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableBoardComponent]
    });
    fixture = TestBed.createComponent(AvailableBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
