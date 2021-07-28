import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule,Store} from '@ngrx/store';
import { AppRoutingModule } from '../app-routing.module';

import { SavedLocationsComponent } from './saved-locations.component';

describe('SavedLocationsComponent', () => {
  let component: SavedLocationsComponent;
  let fixture: ComponentFixture<SavedLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedLocationsComponent ],
      imports: [StoreModule.forRoot({}), AppRoutingModule]
     
    })
    .compileComponents();
 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
