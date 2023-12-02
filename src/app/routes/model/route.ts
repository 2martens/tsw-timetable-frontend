import {DEFAULT_STATION, Station} from "./station";
import {Country} from "./country";
import {Depot} from "./depot";
import {Portal} from "./portal";

export interface Route {
  id: string;
  name: string;
  country: Country;
  stations: Station[];
  firstStation: Station;
  lastStation: Station;
  numberOfStations: number;
  depots: Depot[];
  portals: Portal[];
}

export const DEFAULT_ROUTE: Route = {
  id: "",
  name: "",
  country: {
    code: 'de',
    name: 'Germany'
  },
  firstStation: DEFAULT_STATION,
  lastStation: DEFAULT_STATION,
  stations: [],
  numberOfStations: 0,
  depots: [],
  portals: []
}
