import {DEFAULT_FORMATION, Formation} from "../../formations/model/formation";

export interface Rotation {
  id: string;
  timetableId: string;
  formation: Formation;
  startsInVault: boolean;
  numberOfServices: number;
  startTime: string;
  endTime: string;
}

export const DEFAULT_ROTATION: Rotation = {
  id: '',
  timetableId: '',
  formation: {...DEFAULT_FORMATION},
  startsInVault: false,
  numberOfServices: 0,
  startTime: '',
  endTime: ''
};
