import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, LegendItem } from 'chart.js/auto';
import { UserConfig } from 'gridjs';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { fadeAnimation } from '../shared/animations/fade.animation';
import {
  EventTrackerModelField,
  ProjectUserStats,
} from '../shared/graphql/data-types';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';
import { TimespanChartFiltersComponent } from '../shared/components/timespan-chart/timespan-chart-filters/timespan-chart-filters.component';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css'],
  animations: [fadeAnimation],
})
export class AcquisitionComponent implements OnInit {
  eventTrackerSub = new BehaviorSubject(EventTrackerModelField.UTM_CAMPAIGN);

  acquisitions$ = combineLatest([
    this.projectService.currentProject$,
    this.eventTrackerSub,
  ]).pipe(
    switchMap(([project, eventTracker]) => {
      return this.gqlClient.getUserWalletAndTransactionStats({
        projectId: project!.id,
        field: eventTracker,
      });
    })
  );

  setDimension(name: string) {
    if (this.attributionDimensionSub.value === 'campaigns') {
      this.selectedDimensionSub.next(name);
    }
  }

  selectedDimensionSub = new BehaviorSubject<string | null>('');
  selectedDimension$ = this.selectedDimensionSub.asObservable();

  walletsFiltersSub = TimespanChartFiltersComponent.generateInitialFilters();
  walletFilters$ = this.walletsFiltersSub.asObservable();

  wallets$ = combineLatest([
    this.projectService.currentProject$,
    this.selectedDimension$,
    this.walletFilters$,
  ]).pipe(
    switchMap(([project, dimension, filters]) =>
      this.gqlClient.totalConnectedWallets({
        projectId: project!.id,
        filter: {
          tracker: {
            utmCampaign: dimension ?? '',
          },
        },
        granularity: filters.granularity,
        from: filters.from,
        to: filters.to,
      })
    )
  );

  transactionsFiltersSub =
    TimespanChartFiltersComponent.generateInitialFilters();
  transactionsFilters$ = this.transactionsFiltersSub.asObservable();

  transactions$ = combineLatest([
    this.projectService.currentProject$,
    this.selectedDimension$,
    this.transactionsFilters$,
  ]).pipe(
    switchMap(([project, dimension, filters]) =>
      this.gqlClient.totalTransactions({
        projectId: project!.id,
        filter: {
          tracker: {
            utmCampaign: dimension ?? '',
          },
        },
        granularity: filters.granularity,
        from: filters.from,
        to: filters.to,
      })
    )
  );

  isDimensionSelectorHidden = true;

  toggleDimensionSelector() {
    this.isDimensionSelectorHidden = !this.isDimensionSelectorHidden;
  }

  attributionDimensionSub = new BehaviorSubject<AttributionDimension>(
    'campaigns'
  );
  attributionDimension$ = this.attributionDimensionSub.asObservable();

  setAttributionDimension(dimension: AttributionDimension) {
    this.attributionDimensionSub.next(dimension);

    var tracker: EventTrackerModelField;
    switch (dimension) {
      case 'campaigns':
        tracker = EventTrackerModelField.UTM_CAMPAIGN;
        break;
      case 'source':
        tracker = EventTrackerModelField.UTM_SOURCE;
        break;
      case 'content':
        tracker = EventTrackerModelField.UTM_CONTENT;
        break;
      case 'medium':
        tracker = EventTrackerModelField.UTM_MEDIUM;
        break;
      case 'term':
        tracker = EventTrackerModelField.UTM_TERM;
        break;
      case 'path':
        tracker = EventTrackerModelField.PATH;
        break;
      case 'origin':
        tracker = EventTrackerModelField.ORIGIN;
        break;
    }

    this.isDimensionSelectorHidden = true;

    this.eventTrackerSub.next(tracker);
  }

  getPercentageRatio(metric: number, total: number): string {
    return ((metric / total) * 100).toFixed(2);
  }

  constructor(
    private gqlClient: GQLClient,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    // this.chart$.subscribe()
  }
}

type AttributionDimension =
  | 'campaigns'
  | 'source'
  | 'content'
  | 'medium'
  | 'term'
  | 'path'
  | 'origin';
