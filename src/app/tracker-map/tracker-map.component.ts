import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IssTrackerService } from '../services/iss-tracker.service';
import * as moment from 'moment';
import { ISSLocation } from '../models/location';
import { addLocation } from '../state/locations.actions';
import { Store } from '@ngrx/store';
import { AgmMap } from '@agm/core';
import { ActivatedRoute } from '@angular/router';
import { selectLocationByName } from '../state/locations.selectors';
import { AppState } from '../state/app.state';
import { poll } from '../core/poll.operator';

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html',
  styleUrls: ['./tracker-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TrackerMapComponent implements OnInit, OnDestroy {
  @ViewChild(AgmMap) myMap: AgmMap | undefined;
  lat: number = 1;
  lng: number = 1  ;
  zoom :number = 1;
  APP_POLLINTERVAL = 2000;//TODO:manage in config

  currentLat: number = 1;
  currentLong: number = 1;
  selectedLocation = {} as ISSLocation;
  location!: ISSLocation;
  zoomedLocation: ISSLocation | undefined;
  displayDialog: boolean = false;
  private sub: Subscription | undefined;  
  private subSetLocation: Subscription | undefined;

  constructor(
    private trackService: IssTrackerService,
    private store: Store<AppState>,
    private route:ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();    
    this.subSetLocation?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.trackService.trackLoaction()
    .pipe(
      poll(this.APP_POLLINTERVAL),
    )
    .subscribe(
      location => {
        this.location = location;
      }
    );
    this.route.params.subscribe((params) => {
    let locationName =params['location'];//this.route.snapshot.paramMap.get('location')
    if(locationName){
      this.store.select(selectLocationByName(locationName)).subscribe(
        location=>{
          if(location){
            this.zoomedLocation = location;
            this.zoom = 6;
            this.lat = location.latitude;
            this.lng = location.longitude;
            this.myMap?.triggerResize(true);
          }
        }
      )
     
    }
    else{
      this.zoom = 1;
    }
    });
   

    

  }
  
  openSaveLocationDialog() {
    this.displayDialog = true;
    this.selectedLocation = this.location;
  }

  saveLocation(location: ISSLocation) {
    this.store.dispatch(addLocation({ location }));
    this.displayDialog = false;
  }


}
