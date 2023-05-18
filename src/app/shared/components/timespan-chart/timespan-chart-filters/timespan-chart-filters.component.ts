import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventFilter } from 'src/app/shared/graphql/data-types';

@Component({
  selector: 'app-timespan-chart-filters',
  templateUrl: './timespan-chart-filters.component.html',
  styleUrls: ['./timespan-chart-filters.component.css']
})
export class TimespanChartFiltersComponent implements OnInit {

  @Input() appliedFilters!: BehaviorSubject<AppliedFilters>

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

  private updateAppliedFilters() {
    
  }

}

type VisibilityState = 'topN' | 'discriminator' | 'timeframe' | 'none'

type AppliedFilters = {
  from: string,
  to: string,
  filters: EventFilter[],
  topN: number
}