import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonContent, IonItem, IonLabel, IonList, IonPopover, IonSearchbar} from "@ionic/angular/standalone";
import {Item} from "./item";
import {SearchbarCustomEvent} from "@ionic/angular";
import {map, Observable, of} from "rxjs";

type PositionAlign = "start" | "center" | "end";
type PositionSide = "top" | "right" | "bottom" | "left" | "start" | "end";

@Component({
  selector: 'app-typeahead',
  standalone: true,
  imports: [CommonModule, IonContent, IonItem, IonLabel, IonList, IonPopover, IonSearchbar],
  templateUrl: './typeahead.component.html',
  styleUrl: './typeahead.component.scss'
})
export class TypeaheadComponent<T extends Item> {
  @Input({required: true}) isOpen: boolean = false;
  @Input() debounce: number = 300;
  @Input() event: Event = new Event('');
  @Input() alignment: PositionAlign = 'center';
  @Input() side: PositionSide = 'bottom';
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() itemSelected: EventEmitter<T> = new EventEmitter<T>();
  @ViewChild('popover') popover: any;

  _items: Observable<T[]> = of([]);

  @Input({required: true}) set items$(newItems: Observable<T[]>) {
    if (newItems !== null) {
      this._items = newItems;
      this._filteredItems = newItems;
    }
  }

  _filteredItems?: Observable<T[]>;

  get filteredItems$() {
    return this._filteredItems || of([]);
  }

  filterItems(event: SearchbarCustomEvent) {
    if (typeof event.detail.value === "string") {
      const searchValue = event.detail.value.toLowerCase();
      this._filteredItems = this._items.pipe(
        map(items => items.filter(item => item.name.toLowerCase().includes(searchValue)))
      );
    }
  }

  selectItem(selectedItem: T) {
    this.itemSelected.emit(selectedItem);
    this.dismissed.emit(true);
  }
}
