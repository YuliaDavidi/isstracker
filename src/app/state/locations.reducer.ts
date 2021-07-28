import { createReducer, on, Action, State } from '@ngrx/store';
import { addLocation, removeLocation, userLocationsList } from './locations.actions';
import { ISSLocation } from '../models/location';

export const initialState: Array<ISSLocation> = JSON.parse(localStorage.getItem('locations')!) ?? [];

export const locationsReducer = createReducer(
  initialState,
  on(removeLocation, (state, { locationName }) => {
    return state.filter(x => x.name !== locationName);
  }),
  on(addLocation, (state, { location }) => {
    if (state.find(item => item.name === location.name))
      return state;
    return [...state, location]

  }),
  
  on(userLocationsList, (state, { location }) => [...state]
  )
 
);