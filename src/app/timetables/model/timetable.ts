import {DEFAULT_ROUTE, Route} from "../../routes/model/route";

export interface Timetable {
  id: string;
  name: string;
  route: Route;
  date: string;
  state: TimetableState;
  numberOfServices: number;
}

export enum TimetableState {
  NEW,
  PROCESSING,
  ENTER_FORMATIONS,
  LINK_SERVICES,
  READY_FOR_USAGE
}

export const TimetableStateTexts: { [name: number]: string } = {
  0: $localize`New`,
  1: $localize`Processing`,
  2: $localize`Enter formations`,
  3: $localize`Link services`,
  4: $localize`Ready for usage`
}

export const DEFAULT_TIMETABLE: Timetable = {
  id: '',
  name: '',
  route: {...DEFAULT_ROUTE},
  date: '',
  state: TimetableState.NEW,
  numberOfServices: 0
};
