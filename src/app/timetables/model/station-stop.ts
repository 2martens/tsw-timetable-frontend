import {DEFAULT_STATION, Station} from "../../routes/model/station";

export interface StationStop {
  station: Station;
  time: string;
  platform: string;
  withLoading: boolean;
}

export const DEFAULT_STATION_STOP: StationStop = {
  station: {...DEFAULT_STATION},
  time: '',
  platform: '',
  withLoading: false,
};
