import {Item} from "../../typeahead/item";

export interface Station extends Item {
  id: string;
  name: string;
}

export const DEFAULT_STATION: Station = {
  id: '',
  name: ''
};
