import {Item} from "../../typeahead/item";
import {DEFAULT_STATION, Station} from "./station";
import {TravelDuration} from "./travel-duration";

export interface Portal extends Item {
  id: string;
  name: string;
  nearestStation: Station;
  travelDurations: TravelDuration[];
}

export const DEFAULT_PORTAL: Portal = {
  id: '',
  name: '',
  nearestStation: DEFAULT_STATION,
  travelDurations: []
};
