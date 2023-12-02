import {Station} from "../model/station";
import {InputCustomEvent} from "@ionic/angular";
import {Formation} from "../../formations/model/formation";
import {TravelDuration} from "../model/travel-duration";
import {DEFAULT_DEPOT, Depot} from "../model/depot";

export class DepotComponent {
  depot: Depot = {...DEFAULT_DEPOT};
  isFormationPopoverOpen = false;
  clickEvent: MouseEvent = new MouseEvent('mouseup');
  travelDurationIndex?: number;

  compareWithStation(station1: Station, station2: Station) {
    return station1 && station2 ? station1.id === station2.id : station1 === station2;
  }

  changeTime(index: number, event: InputCustomEvent) {
    if (event.detail.value != null) {
      const newDurations = [...this.depot.travelDurations];
      newDurations[index] = {...newDurations[index], time: +event.detail.value};
      this.depot.travelDurations = newDurations;
    }
  }

  addTravelDuration() {
    this.isFormationPopoverOpen = true;
  }

  selectFormation(formation: Formation) {
    const newDurations = [...this.depot.travelDurations];
    if (this.travelDurationIndex !== undefined) {
      newDurations[this.travelDurationIndex].formation = formation;
    } else {
      newDurations.push({
        formation: formation,
        time: 0
      });
    }
    this.depot.travelDurations = newDurations;
    this.travelDurationIndex = undefined;
  }

  openPopoverFormation(event: MouseEvent, index?: number) {
    this.travelDurationIndex = index;
    this.clickEvent = event;
    this.isFormationPopoverOpen = true;
  }

  deleteTravelDuration(travelDuration: TravelDuration) {
    this.depot.travelDurations = this.depot.travelDurations.filter(duration => duration !== travelDuration);
  }

  trackBy(_: number, item: TravelDuration) {
    return item.formation.id;
  }
}
