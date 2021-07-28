import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { ISSLocation } from "../models/location";

export const selectLocations = (state: AppState) => state.locations;

export const selectSavedLocations = createSelector(
  selectLocations,
  (state: Array<ISSLocation>) => state
);
export const selectLocationByName =(locationName: string) => createSelector(
  selectLocations,
  (locations: Array<ISSLocation>) => 
  locations.find(item => item.name === locationName) 
);