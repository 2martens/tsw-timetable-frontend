import {Station} from "../model/station";
import {InputCustomEvent, SelectCustomEvent} from "@ionic/angular";
import {Formation} from "../../formations/model/formation";
import {TravelDuration} from "../model/travel-duration";
import {DEFAULT_PORTAL, Portal} from "../model/portal";
import {FormationsStoreService} from "../../formations/service/formations-store.service";
import {inject} from "@angular/core";
import {map, Observable} from "rxjs";

export class PortalComponent {
  portal: Portal = {...DEFAULT_PORTAL};
  usedFormations: Formation[] = [];
  isFormationPopoverOpen = false;
  clickEvent: MouseEvent = new MouseEvent('mouseup');
  travelDurationIndex?: number;

  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  readonly formations$ = this.storeService.getFormations$();
  unusedFormations$!: Observable<Formation[]>;

  compareWithStation(station1: Station, station2: Station) {
    return station1 && station2 ? station1.id === station2.id : station1 === station2;
  }

  compareWithFormation(formation1: Formation, formation2: Formation) {
    return formation1 && formation2 ? formation1.id == formation2.id : formation1 === formation2;
  }

  changeTime(index: number, event: InputCustomEvent) {
    if (event.detail.value != null) {
      const newDurations = [...this.portal.travelDurations];
      newDurations[index] = {...newDurations[index], time: +event.detail.value};
      this.portal.travelDurations = newDurations;
    }
  }

  addTravelDuration(event: MouseEvent) {
    this.clickEvent = event;
    this.isFormationPopoverOpen = true;
  }

  onSelectFormation(event: SelectCustomEvent, index: number) {
    if (event.detail.value != null) {
      this.travelDurationIndex = index;
      this.selectFormation(event.detail.value);
    }
  }

  selectFormation(formation: Formation) {
    const newDurations: TravelDuration[] = [...this.portal.travelDurations];

    if (this.travelDurationIndex !== undefined) {
      newDurations[this.travelDurationIndex] = {...newDurations[this.travelDurationIndex], formation};
    } else if (!newDurations.some(duration => duration.formation.id == formation.id)) {
      newDurations.push({
        formation: formation,
        time: 0
      });
    }
    this.portal.travelDurations = newDurations;
    this.usedFormations = this.portal.travelDurations.map(duration => duration.formation);
    this.updateUnusedFormations();
    this.travelDurationIndex = undefined;
  }

  deleteTravelDuration(travelDuration: TravelDuration) {
    this.portal.travelDurations = this.portal.travelDurations.filter(
      duration => duration.formation.id !== travelDuration.formation.id
    );
    this.usedFormations = this.portal.travelDurations.map(duration => duration.formation);
    this.updateUnusedFormations();
  }

  trackBy(_: number, item: TravelDuration) {
    return item.formation.id;
  }

  updateUnusedFormations() {
    this.unusedFormations$ = this.formations$.pipe(
      map(formations => formations.filter(
        formation => !this.usedFormations.some(usedFormation => usedFormation.id == formation.id)
      )),
    );
  }
}
