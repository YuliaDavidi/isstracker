import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrackerMapComponent } from './tracker-map.component';
import { AppRoutingModule } from '../app-routing.module';
import { StoreModule } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TrackerMapRoutingModule } from './tracker-map-routing.module';
import { RouterModule } from '@angular/router';

describe('TrackerMapComponent', () => {
  let component: TrackerMapComponent;
  let fixture: ComponentFixture<TrackerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerMapComponent],
      imports:[
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        TrackerMapRoutingModule,
        RouterModule.forRoot([]),
        ButtonModule,
        DialogModule,
        FormsModule
      ],
      providers:[]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
