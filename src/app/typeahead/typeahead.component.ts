import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {IonContent, IonItem, IonLabel, IonList, IonPopover, IonSearchbar} from "@ionic/angular/standalone";
import {Item} from "./item";
import {SearchbarCustomEvent} from "@ionic/angular";
import {map, Observable} from "rxjs";

type PositionAlign = "start" | "center" | "end";
type PositionSide = "top" | "right" | "bottom" | "left" | "start" | "end";

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [IonContent, IonItem, IonLabel, IonList, IonPopover, IonSearchbar, AsyncPipe, NgForOf],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss'
})
export class TypeaheadComponent<T extends Item> implements OnChanges {
  @Input() debounce: number = 300;
  @Input() event: Event = new Event('');
  @Input() alignment: PositionAlign = 'center';
  @Input() side: PositionSide = 'bottom';
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemSelected: EventEmitter<T> = new EventEmitter<T>();
  @ViewChild('popover') popover: any;

  @Input({required: true}) isOpen: boolean = false;
  @Input({required: true}) items$?: Observable<T[]>;
  @Input() usedItems: T[] = [];
  @Input() itemsAreFiltered: boolean = false
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>()
  _filteredItems!: Observable<T[]>;

  ngOnChanges(changes: SimpleChanges) {
    const readyForUpdate = this.items$ != null && this.usedItems != null && this.isOpen != null;
    if (!this.itemsAreFiltered && readyForUpdate
      && changes['isOpen']?.currentValue
      && !changes['isOpen']?.previousValue) {
      this.updateFilteredItems();
    }
    if (this.itemsAreFiltered && readyForUpdate && changes['items$'] != null && this.isOpen) {
      this.updateFilteredItems();
    }
  }

  get filteredItems$() {
    return this._filteredItems;
  }

  private updateFilteredItems() {
    if (this.items$ != null) {
      if (this.itemsAreFiltered) {
        this._filteredItems = this.items$;
      } else {
        this._filteredItems = this.items$.pipe(
          map(items => items.filter(item => !this.usedItems.some(usedItem => usedItem.id == item.id)))
        );
      }
    }
  }

  filterItems(event: SearchbarCustomEvent) {
    if (typeof event.detail.value === "string") {
      const searchValue = event.detail.value.toLowerCase();
      this.filterChanged.emit(searchValue);
      if (this.items$ != null) {
        if (!this.itemsAreFiltered) {
          this._filteredItems = this.items$.pipe(
            map(items => items.filter(item => item.name.toLowerCase().includes(searchValue)))
          );
        }
      }
    }
  }

  selectItem(selectedItem: T) {
    if (this.itemsAreFiltered) {
      this.items$ = undefined
    }
    this.itemSelected.emit(selectedItem);
    this.dismissed.emit(true);
  }
}
