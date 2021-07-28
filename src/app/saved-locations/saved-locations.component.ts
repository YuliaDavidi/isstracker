import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap, map } from 'rxjs/operators';
import { ISSLocation } from '../models/location';
import { IssTrackerService } from '../services/iss-tracker.service';
import { AppState } from '../state/app.state';
import { removeLocation } from '../state/locations.actions';
import { selectLocations, selectSavedLocations } from '../state/locations.selectors';

@Component({
  selector: 'app-saved-locations',
  templateUrl: './saved-locations.component.html',
  styleUrls: ['./saved-locations.component.scss']
})
export class SavedLocationsComponent implements OnInit, OnDestroy , AfterViewInit{
  public loadSelectedLocationsTest() {
   return true;
  }
  
  @ViewChild('search') search:ElementRef | undefined;
  
  private sub: Subscription | undefined;
  locations : ISSLocation[]=[];
  filteredLocations  : ISSLocation[]=[];
  filter:string="";
  zoomedLocation:ISSLocation | undefined;
  constructor(private store: Store<AppState>,
    private route:Router) {
    this.loadSelectedLocations();
  }
   loadSelectedLocations(){
    this.sub = this.store.pipe(select(selectSavedLocations))
    .subscribe(
      locs => {
        this.locations = locs;
        this.filteredLocations = locs;
      }
    )
  }
  filterChanged(event:any){
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {  
  }

  ngAfterViewInit() {
    fromEvent<any>(this.search?.nativeElement, 'keyup').pipe(      
      map(e=>e.target.value),
      //filter(searchText=>searchText.length>2),
      debounceTime(500),
      distinctUntilChanged(),
      tap(
        searchText=>{
          this.filteredLocations = this.locations.filter(x=>x.name.includes(searchText));
        }
      )
    ).subscribe();

  }
  
  locationClicked(location: ISSLocation){
   // this.trackerService.selectLocation(location);
   if(location===this.zoomedLocation){
    this.route.navigate(['map']);
    this.zoomedLocation=undefined;
   }
   else{
    this.zoomedLocation=location;
    this.route.navigate(['map',{location:location.name}])
   }
     
      
  }

  deleteLocation(name:string){
    this.store.dispatch(removeLocation({locationName:name}));
  }
}

