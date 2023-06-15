import { Component, Input, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { EventFilter } from 'src/app/shared/graphql/data-types';

@Component({
  selector: 'app-timespan-chart-filters',
  templateUrl: './timespan-chart-filters.component.html',
  styleUrls: ['./timespan-chart-filters.component.css']
})
export class TimespanChartFiltersComponent implements OnInit {

  @Input() appliedFilters!: BehaviorSubject<TimespanAppliedFilters>

  public static generateInitialFilters() {
    return new BehaviorSubject<TimespanAppliedFilters>({
      filters: [],
      from: dayjs().subtract(30, 'days').toISOString(),
      to: dayjs().toISOString(),
      pagination: 30,
      granularity: '1d',
      topN: 1
    })
  }

  topNFilterItems = [
    'Top 1',
    'Top 2',
    'Top 3',
    'Top 5',
  ]

  discriminatorFilterItems = [
    'Nothing',
    'Browser',
    'Network',
    'Wallet Provider',
    'Country',
    'Wallet Type',
    'URL Path',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'UTM Term',
    'UTM Origin',
  ]

  timeframeFilterItems = [
    '1D',
    '7D',
    '15D',
    '30D',
    '2M',
    '3M',
    '6M',
    '1Y'
  ]

  selectedTimeframe = '30D'
  selectedDiscriminator = 'Nothing'
  selectedTopN = 'Top 1'

  visibilitySub = new BehaviorSubject<VisibilityState>('none')
  visibility$ = this.visibilitySub.asObservable()

  constructor() { }

  ngOnInit(): void {
    
  }

  timeFrameFilterClicked(timeframe: string) {
    this.selectedTimeframe = timeframe
    this.visibilitySub.next('none')
    
    var from = dayjs()
    var to = dayjs()
    var granularity = '1d'
    var pagination = 1

    if(timeframe === '1D') {
      from = from.subtract(1, 'days')
      granularity = '1h'
      pagination = 24
    } else if(timeframe === '7D') {
      from = from.subtract(7, 'days')
      pagination = 7
    } else if(timeframe === '15D') {
      from = from.subtract(15, 'days')
      pagination = 15
    } else if(timeframe === '30D') {
      from = from.subtract(30, 'days')
      pagination = 30
    } else if(timeframe === '2M') {
      from = from.subtract(60, 'days')
      pagination = 60
      granularity = '2d'
    } else if(timeframe === '3M') {
      from = from.subtract(90, 'days')
      granularity = '3d'
      pagination = 30
    } else if(timeframe === '6M') {
      from = from.subtract(180, 'days')
      granularity = '1d'
      pagination = 180
    } else if(timeframe === '1Y') {
      from = from.subtract(365, 'days')
      granularity = '1d'
      pagination = 365
    }

    this.appliedFilters.next({
      filters: this.appliedFilters.value.filters,
      from: from.toISOString(),
      to: to.toISOString(),
      pagination: pagination,
      granularity: granularity,
      topN: this.appliedFilters.value.topN
    })
  } 

  discriminatorFilterClicked(item: string) {
    this.selectedDiscriminator = item
    this.visibilitySub.next('none')
  }

  topNFilterClicked(item: string) {
    this.selectedTopN = item
    this.visibilitySub.next('none')
  }

  setVisibility(visibility: VisibilityState) {
    if(visibility === this.visibilitySub.value) { this.visibilitySub.next('none'); return }
    this.visibilitySub.next(visibility)
  }

}

type VisibilityState = 'topN' | 'discriminator' | 'timeframe' | 'none'

export type TimespanAppliedFilters = {
  from: string,
  to: string,
  granularity: string,
  pagination: number,
  filters: EventFilter[],
  topN: number
}