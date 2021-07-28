import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IssTrackerService } from './iss-tracker.service';
import { ISSLocation } from '../models/location';
import * as moment from 'moment';

describe('IssTrackerService', () => {
  let service: IssTrackerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ],
      providers: []
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(IssTrackerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#trackLoaction should use GET to retrieve data',() => {
    service.trackLoaction().subscribe();

    const testRequest = httpTestingController.expectOne({ method: 'GET', url: service.API_URL });
    
    expect(testRequest.request.method).toEqual('GET');
  });

  it('#trackLoaction should return expected data', (done) => {
    const sourceData = {
      timestamp: 1627384866,
      message: "success",
      iss_position: {
        longitude: "1",
        latitude: "1"
      }
    }

    const expectedData: ISSLocation = {
      longitude: 1,
      latitude: 1,
      name: '',
      date: moment(sourceData.timestamp).toDate()
    };

    service.trackLoaction().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(service.API_URL);
    testRequest.flush(sourceData);
  });

});
