import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, defer, throwError, Subject } from 'rxjs';
import { catchError, auditTime, map } from 'rxjs/operators';
import { ISSLocation } from '../models/location';
import { poll } from '../core/poll.operator';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class IssTrackerService {

  API_URL="http://api.open-notify.org/iss-now.json"; //TODO:manage in config

  private currentLocation = new Subject<ISSLocation>();
  currentLocation$ = this.currentLocation.asObservable().pipe();
 
  constructor(private http: HttpClient) {}  

  trackLoaction(): Observable<ISSLocation> {
    return this.http
      .get<any>(
        this.API_URL)
    .pipe(
      map(res=>{
      let location = {} as ISSLocation;
      location.name='';
      location.latitude = +res.iss_position.latitude;       
      location.longitude = +res.iss_position.longitude;
      location.date= moment(+res.timestamp).toDate();
      this.currentLocation.next(location);
      return location;
    }), 
    catchError(err => {
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
  }))
  }
  
}

