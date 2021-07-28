import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule,Store} from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppRoutingModule } from '../app-routing.module';
import { ISSLocation } from '../models/location';
import { AppState } from '../state/app.state';
import { removeLocation } from '../state/locations.actions';
import { selectSavedLocations } from '../state/locations.selectors';

import { SavedLocationsComponent } from './saved-locations.component';

describe('SavedLocationsComponent', () => {
  let component: SavedLocationsComponent;
  let fixture: ComponentFixture<SavedLocationsComponent>;
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
      declarations: [ SavedLocationsComponent ],
      imports: [StoreModule.forRoot({}), AppRoutingModule],
      providers:[
        provideMockStore({ initialState }),
      ]
     
    })
    .compileComponents();
 
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SavedLocationsComponent);
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
  
  it('deleteLocation check', () => {
    component.deleteLocation(expectedData.name);

    let res = expectedData.name;
    expect(store.dispatch).toHaveBeenCalledWith(
      removeLocation({ locationName:expectedData.name })
    );

  });
 
  
});