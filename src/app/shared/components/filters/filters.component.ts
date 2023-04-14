import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimePeriodVars } from '../../graphql/data-types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filterList: FilterItem[] = [
    // { title: 'Time', content: 'Jan 1st, 2023 - Feb 15th, 2023', type: 'daterange' },
    // { title: 'Location', content: 'Europe', type: 'multiselect' },
    // { title: 'Term', content: 'nft-marketplace', type: 'multiselect' },
  ]

  @Output() timePeriodFilter = new EventEmitter<TimePeriodVars>()

  constructor() { }

  ngOnInit(): void {
  }

}

interface FilterItem {
  title: string,
  content: string,
  type: 'multiselect' | 'daterange'
}
