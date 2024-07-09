import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsTableComponent } from './clubs-table.component';

describe('ClubsTableComponent', () => {
  let component: ClubsTableComponent;
  let fixture: ComponentFixture<ClubsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
