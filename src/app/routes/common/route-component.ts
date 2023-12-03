import {ItemReorderCustomEvent} from "@ionic/angular";
import {Station} from "../model/station";
import {DEFAULT_PORTAL, Portal} from "../model/portal";
import {DEFAULT_ROUTE, Route} from "../model/route";
import {DEFAULT_DEPOT, Depot} from "../model/depot";
import {Country} from "../model/country";
import {Item} from "../../typeahead/item";

export class RouteComponent {
  route: Route = {...DEFAULT_ROUTE};

  isStationPopoverOpen = false;
  clickEvent: MouseEvent = new MouseEvent('mouseup');
  stationIndex?: number;

  isCreatePortalModalOpen = false;
  isUpdatePortalModalOpen = false;
  portalIndex?: number;
  _updatedPortal: Portal = {...DEFAULT_PORTAL};

  isCreateDepotModalOpen = false;
  isUpdateDepotModalOpen = false;
  depotIndex?: number;
  _updatedDepot: Depot = {...DEFAULT_DEPOT};

  compareWithCountry(country1: Country, country2: Country) {
    return country1 && country2 ? country1.code === country2.code : country1 === country2;
  }

  trackBy<T extends Item>(_: number, item: T) {
    return item.id;
  }

  handleReorderStations(event: ItemReorderCustomEvent) {
    const newStations = [...this.route.stations];
    const movedItem = newStations[event.detail.from];
    if (event.detail.from > event.detail.to) {
      for (let i = event.detail.from - 1; i >= event.detail.to; i--) {
        newStations[i + 1] = newStations[i];
      }
    } else {
      for (let i = event.detail.from + 1; i <= event.detail.to; i++) {
        newStations[i - 1] = newStations[i];
      }
    }
    newStations[event.detail.to] = movedItem;
    this.route.stations = newStations;
    event.detail.complete();
  }

  deleteStation(deletedStation: Station) {
    this.route.stations = this.route.stations.filter(station => station.id !== deletedStation.id);
  }

  selectStation(newStation: Station) {
    const newStations = [...this.route.stations];
    if (this.stationIndex !== undefined) {
      newStations[this.stationIndex] = newStation;
    } else if (!newStations.some(station => station.id == newStation.id)) {
      newStations.push(newStation);
    }
    this.route.stations = newStations;
    this.stationIndex = undefined;
  }

  openPopoverStation(event: MouseEvent, index?: number) {
    this.stationIndex = index;
    this.clickEvent = event;
    this.isStationPopoverOpen = true;
  }

  addPortal() {
    this.isCreatePortalModalOpen = true;
  }

  insertPortal(portal: Portal) {
    const newPortals = [...this.route.portals];
    newPortals.push(portal);
    this.route.portals = newPortals;
  }

  get updatedPortal() {
    return this._updatedPortal;
  }

  set updatedPortal(changedPortal: Portal) {
    this._updatedPortal = changedPortal;
    if (this.portalIndex != null) {
      const newPortals = [...this.route.portals];
      newPortals[this.portalIndex] = changedPortal;
      this.route.portals = newPortals;
    }
  }

  updatePortal(portal: Portal, index: number) {
    this._updatedPortal = portal;
    this.portalIndex = index;
    this.isUpdatePortalModalOpen = true;
  }

  deletePortal(deletedPortal: Portal) {
    this.route.portals = this.route.portals.filter(portal => portal.id !== deletedPortal.id);
  }

  addDepot() {
    this.isCreateDepotModalOpen = true;
  }

  insertDepot(depot: Depot) {
    const newDepots = [...this.route.depots];
    newDepots.push(depot);
    this.route.depots = newDepots;
  }

  get updatedDepot() {
    return this._updatedDepot;
  }

  set updatedDepot(changedDepot: Depot) {
    this._updatedDepot = changedDepot;
    if (this.depotIndex != null) {
      const newDepots = [...this.route.depots];
      newDepots[this.depotIndex] = changedDepot;
      this.route.depots = newDepots;
    }
  }

  updateDepot(depot: Depot) {
    this._updatedDepot = depot;
    this.isUpdateDepotModalOpen = true;
  }

  deleteDepot(deletedDepot: Depot) {
    this.route.depots = this.route.depots.filter(depot => depot.id !== deletedDepot.id);
  }
}
