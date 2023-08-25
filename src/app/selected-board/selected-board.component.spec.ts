import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBoardComponent } from './selected-board.component';

describe('SelectedBoardComponent', () => {
  let component: SelectedBoardComponent;
  let fixture: ComponentFixture<SelectedBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedBoardComponent]
    });
    fixture = TestBed.createComponent(SelectedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
