export enum LocationType {
  EVENT = "event",
  LOCATION = "location"
}

export interface Location {
  type: LocationType;
  location: string;
}
