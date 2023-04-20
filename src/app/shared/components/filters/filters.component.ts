import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EventFilter, TimePeriodVars } from '../../graphql/data-types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  animations: [trigger('grow', [
    transition('void <=> *', []),
    transition('* <=> *', [
      style({height: '{{startHeight}}px', opacity: 0}),
      animate('.5s ease'),
    ], {params: {startHeight: 0}})
  ])]
})
export class FiltersComponent implements OnInit {

  filterList: FilterItem[] = [
  ]

  @Output() timePeriodFilter = new EventEmitter<TimePeriodVars>()

  addFiltersOpened = false

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    var vars: EventFilter = {

    }
  }

  toggleAddFilters() {
    this.addFiltersOpened = !this.addFiltersOpened
  }

}

interface FilterItem {
  title: string,
  content: string,
  type: 'multiselect' | 'daterange'
}
