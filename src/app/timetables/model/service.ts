import {DEFAULT_FORMATION, Formation} from "../../formations/model/formation";
import {DEFAULT_STATION_STOP, StationStop} from "./station-stop";

export interface Service {
  id: string;
  serviceNumber: string;
  line: string;
  direction: Direction;
  formation: Formation;
  formationReversed: boolean;
  startOnRoute: StationStop;
  endOnRoute: StationStop;
  fromDepotAtStart: boolean;
  toDepotAtEnd: boolean;
  intermediateStops: StationStop[];
  virtualDestinations: string[];
  rotationId: string;
}

export enum Direction {
  UP,
  DOWN
}

export const DEFAULT_SERVICE: Service = {
  id: '',
  serviceNumber: '',
  line: '',
  direction: Direction.UP,
  formation: {...DEFAULT_FORMATION},
  formationReversed: false,
  startOnRoute: {...DEFAULT_STATION_STOP},
  endOnRoute: {...DEFAULT_STATION_STOP},
  fromDepotAtStart: false,
  toDepotAtEnd: false,
  intermediateStops: [],
  virtualDestinations: [],
  rotationId: ''
};
