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
  @Input({required: true}) items$!: Observable<T[]>;
  @Input() usedItems: T[] = [];
  _filteredItems!: Observable<T[]>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usedItems']?.currentValue != null
      && changes['items$']?.currentValue != null
      && changes['isOpen']?.currentValue != null) {
      this.updateFilteredItems();
    }
  }

  get filteredItems$() {
    return this._filteredItems;
  }

  private updateFilteredItems() {
    this._filteredItems = this.items$.pipe(
      map(items => items.filter(item => !this.usedItems.some(usedItem => usedItem.id == item.id)))
    );
  }

  filterItems(event: SearchbarCustomEvent) {
    if (typeof event.detail.value === "string") {
      const searchValue = event.detail.value.toLowerCase();
      this._filteredItems = this.items$.pipe(
        map(items => items.filter(item => item.name.toLowerCase().includes(searchValue)))
      );
    }
  }

  selectItem(selectedItem: T) {
    this.itemSelected.emit(selectedItem);
    this.dismissed.emit(true);
  }
}
