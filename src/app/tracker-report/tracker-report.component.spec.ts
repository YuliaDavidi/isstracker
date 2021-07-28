import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerReportComponent } from './tracker-report.component';

describe('TrackerReportComponent', () => {
  let component: TrackerReportComponent;
  let fixture: ComponentFixture<TrackerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
