import {Item} from "../../typeahead/item";
import {DEFAULT_STATION, Station} from "./station";
import {TravelDuration} from "./travel-duration";

export interface Depot extends Item {
  id: string;
  name: string;
  nearestStation: Station;
  tracks: Track[];
  travelDurations: TravelDuration[];
}

export interface Track {
  id: number;
  name: string;
  capacity: number;
}

export const DEFAULT_DEPOT: Depot = {
  id: '',
  name: '',
  nearestStation: DEFAULT_STATION,
  tracks: [],
  travelDurations: []
};
