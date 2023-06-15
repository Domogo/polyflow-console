import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as dayjs from 'dayjs';
import { UserConfig } from 'gridjs';
import { BehaviorSubject, combineLatest, map, Observable, reduce, share, shareReplay, switchMap, tap } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations/fade.animation';
import { TimespanAppliedFilters, TimespanChartFiltersComponent } from 'src/app/shared/components/timespan-chart/timespan-chart-filters/timespan-chart-filters.component';
import { browserIcons, countryIcons, getCountryCodeFromName, walletProviderIcons } from 'src/app/shared/graphics/icons';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class MetricsComponent {

  @Input() filter?: { type: string, name: string}

  countries$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listCountries({
        projectId: project!.id,
        filter: this.generateTrackerFilters()
      }).pipe(
        map(countries => {
          return countries.map(country => {
            return {...country, totalInteractions: country.totalWalletConnections + country.uniqueWalletConnections + country.executedTransactions }
          })
        }),
        map(countries => countries.sort((x,y) => { return y.totalInteractions - x.totalInteractions })),
      )
    }),
    shareReplay(1)
  )
  
  browser$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listBrowsers({
        projectId: project!.id,
        filter: this.generateTrackerFilters()
      })
    }),
    shareReplay(1)
  )

  walletProviders$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listWalletProviders({
        projectId: project!.id,
        filter: this.generateTrackerFilters()
      })
    }),
    shareReplay(1)
  )

  networks$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listNetworks({
        projectId: project!.id,
        filter: this.generateTrackerFilters()
      })
    }),
    shareReplay(1)
  )

  walletsAppliedFiltersSub = TimespanChartFiltersComponent.generateInitialFilters()
  walletAppliedFilters$ = this.walletsAppliedFiltersSub.asObservable()

  wallets$ = combineLatest([
    this.projectService.currentProject$,
    this.walletAppliedFilters$
  ]).pipe(
    switchMap(([project, filters]) => this.gqlClient.totalConnectedWallets({
      projectId: project!.id,
      granularity: '1d',
      from: filters.from,
      to: filters.to,
      pagination: {
        limit: filters.pagination,
        offset: 0
      },
      filter: this.generateTrackerFilters()
    })),
    shareReplay(1)
  )

  txsAppliedFiltersSub = TimespanChartFiltersComponent.generateInitialFilters()
  txsAppliedFilters$ = this.txsAppliedFiltersSub.asObservable()

  txs$ = combineLatest([
    this.projectService.currentProject$,
    this.txsAppliedFilters$
  ]).pipe(
    switchMap(([project,filters]) => this.gqlClient.totalTransactions({
      projectId: project!.id,
      granularity: filters.granularity,
      from: filters.from,
      to: filters.to,
      pagination: {
        limit: filters.pagination,
        offset: 0
      },
      filter: this.generateTrackerFilters()
    })),
    shareReplay(1)
  )

  singedTxsAppliedFiltersSub = TimespanChartFiltersComponent.generateInitialFilters()
  signedTxsAppliedFilters$ = this.singedTxsAppliedFiltersSub.asObservable()

  signedTxs$ = combineLatest([
    this.projectService.currentProject$,
    this.signedTxsAppliedFilters$
  ]).pipe(
    switchMap(([project, filters]) => this.gqlClient.totalSuccessfulTransactions({
      projectId: project!.id,
      granularity: filters.granularity,
      from: filters.from,
      to: filters.to,
      pagination: {
        limit: filters.pagination,
        offset: 0
      },
      filter: this.generateTrackerFilters()
    })),
    shareReplay(1)
  )


    
  totalConnections$ = this.countries$.pipe(
    map(countries => {
      var sum = 0
      countries.forEach(country => { sum += (country.totalWalletConnections + country.executedTransactions + country.uniqueWalletConnections) })
      return sum
    }),
    shareReplay(1)
  )

  constructor(private projectService: ProjectService, private gqlClient: GQLClient) { }


  getFlag(nameC: string): string | undefined {
    return getCountryCodeFromName(nameC)
  }

  getBrowserIcon(name: string): string | undefined {
    return browserIcons.get(name)
  }

  getWalletIcon(name: string): string | undefined {
    return walletProviderIcons.get(name)
  }

  private generateTrackerFilters() {
    return {
      tracker: {
        utmCampaign: this.filter?.type === 'campaign' ? this.filter.name : undefined,
        utmMedium: this.filter?.type === 'medium' ? this.filter.name : undefined,
        utmSource: this.filter?.type === 'source' ? this.filter.name : undefined,
        utmTerm: this.filter?.type === 'term' ? this.filter.name : undefined
      }
    }
  }

  
}
