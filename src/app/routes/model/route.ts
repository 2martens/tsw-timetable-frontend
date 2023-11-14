import {Station} from "./station";
import {Country} from "./country";

export interface Route {
  name: string;
  country: Country;
  firstStation: Station;
  lastStation: Station;
  numberOfStations: number;
}

export interface EditedRoute extends Route {
  stations: Station[];
}
