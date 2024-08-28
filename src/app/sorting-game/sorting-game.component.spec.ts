import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingGameComponent } from './sorting-game.component';

describe('SortingGameComponent', () => {
  let component: SortingGameComponent;
  let fixture: ComponentFixture<SortingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
