export interface Timetable {
  id: string;
  name: string;
  routeId: string;
  routeName: string;
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

export const TimetableStateIndices: { [name: string]: number } = {
  NEW: 0,
  PROCESSING: 1,
  ENTER_FORMATIONS: 2,
  LINK_SERVICES: 3,
  READY_FOR_USAGE: 4
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
  routeId: '',
  routeName: '',
  date: '',
  state: TimetableState.NEW,
  numberOfServices: 0
};
