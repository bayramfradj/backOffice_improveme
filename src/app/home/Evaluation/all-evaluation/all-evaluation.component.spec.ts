import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEvaluationComponent } from './all-evaluation.component';

describe('AllEvaluationComponent', () => {
  let component: AllEvaluationComponent;
  let fixture: ComponentFixture<AllEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
