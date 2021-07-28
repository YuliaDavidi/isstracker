import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ISSLocation } from './models/location';
import { IssTrackerService } from './services/iss-tracker.service';
import { StoreRootState } from './state/route.reducer';
import { getCurrentRouteState } from './state/route.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ISSTRacker';
  tabs: MenuItem[] = [];
  activeItem!: MenuItem;
  location!: ISSLocation;
  private subscriptions: { [key: string]: any } = {};

  constructor(private issTrackerService:IssTrackerService,
    private store: Store<StoreRootState>) { }
  ngOnInit(): void {
    this.tabs = [
      {label: 'Map', icon: 'pi pi-fw pi-map' , routerLink: ['map'] },
      {label: 'Report', icon: 'pi pi-fw pi-table', routerLink: ['report']},
     
  ];
  this.subscriptions.currentLocation=this.issTrackerService.currentLocation$.subscribe(
    (location) => {
      this.location = location;
  });
  
  }
  ngOnDestroy():void{
    this.subscriptions.currentLocation.unsubscribe();
  }
}
