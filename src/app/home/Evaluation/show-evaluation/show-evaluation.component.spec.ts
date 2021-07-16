import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvaluationComponent } from './show-evaluation.component';

describe('ShowEvaluationComponent', () => {
  let component: ShowEvaluationComponent;
  let fixture: ComponentFixture<ShowEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
