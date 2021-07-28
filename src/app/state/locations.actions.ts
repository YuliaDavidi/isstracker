import { createAction, props } from '@ngrx/store';
import { ISSLocation } from '../models/location';

export const userLocationsList = createAction(
  '[Locations List/API] Retrieve Locations Success',
  props<{ location:ISSLocation}>()
);

export const addLocation = createAction(
  '[Location] Add Location',
  props<{ location:ISSLocation }>()

);

export const removeLocation = createAction(
  '[Location] Remove Location',
  props<{ locationName:string}>()

);

