import {Item} from "../../typeahead/item";

export interface Formation extends Item {
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
