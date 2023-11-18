export interface Formation {
  id: string;
  name: string;
  trainSimWorldFormation?: Formation;
  formation: string;
  length: number;
}


export const DEFAULT_FORMATION: Formation = {
  id: "",
  name: "",
  formation: "",
  length: 1,
}
