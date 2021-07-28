import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrackerMapComponent } from './tracker-map.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TrackerMapRoutingModule } from './tracker-map-routing.module';
import { RouterModule } from '@angular/router';
import { ISSLocation } from '../models/location';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from '../state/app.state';
import { selectSavedLocations } from '../state/locations.selectors';
import { addLocation } from '../state/locations.actions';

describe('TrackerMapComponent', () => {
  let component: TrackerMapComponent;
  let fixture: ComponentFixture<TrackerMapComponent>;  
  let store: MockStore<AppState>;
  let initialState:AppState = {
    locations : []
  }
  const expectedData: ISSLocation = {
    longitude: 1,
    latitude: 1,
    name: 'test',
    date: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerMapComponent],
      imports:[
        HttpClientTestingModule,
        TrackerMapRoutingModule,
        RouterModule.forRoot([]),
        ButtonModule,
        DialogModule,
        FormsModule
      ],
      providers:[
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TrackerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let mockAddSelector = store.overrideSelector(selectSavedLocations, [
      expectedData
    ]);

    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveLocation check', () => {
    component.saveLocation(expectedData);

    expect(store.dispatch).toHaveBeenCalledWith(
      addLocation({location:expectedData})
    );

  });
});

