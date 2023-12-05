export interface Timetable {
  id: string;
  name: string;
  route: string;
  date: string;
  state: string;
  numberOfServices: number;
}

export const DEFAULT_TIMETABLE: Timetable = {
  id: '',
  name: '',
  route: '',
  date: '',
  state: '',
  numberOfServices: 0
};
