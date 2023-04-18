import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TimePeriodVars } from '../../graphql/data-types';

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
export class FiltersComponent implements OnInit, OnChanges {

  @Input() trigger: any;

  startHeight!: number;

  @HostBinding('@grow') grow: any;

  filterList: FilterItem[] = [
  ]

  @Output() timePeriodFilter = new EventEmitter<TimePeriodVars>()

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.startHeight = this.element.nativeElement.clientHeight;

    this.grow = {
      value: this.trigger,
      params: {startHeight: this.startHeight}
    };
  }

}

interface FilterItem {
  title: string,
  content: string,
  type: 'multiselect' | 'daterange'
}
