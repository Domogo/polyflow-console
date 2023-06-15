import { AfterViewInit, Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { countryIcons } from '../shared/graphics/icons';
import { genericSpinnerOnElement } from '../shared/operators/button-loading-spinner.operator';
import { AnalyticsService } from './analytics.service';
import { ProjectService } from '../shared/project.service';
import { GQLClient } from '../shared/graphql/graphql-client';
import * as dayjs from 'dayjs';
import { EventTracker, EventTrackerModelField, TxRequestEvent } from '../shared/graphql/data-types';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  @Input() filter?: { type: string, name: string }

  activeTabItem: TabItem = 'metrics'

  activeTimespanSub = new BehaviorSubject<SelectedTimespan>('Today')
  activeTimespan$ = this.activeTimespanSub.asObservable()

  timespanOptions: SelectedTimespan[] = [
    'Today',
    'Yesterday',
    '7D',
    '14D',
    '30D',
    '60D',
    'All'
  ]

  changeTab(item: TabItem) {
    this.activeTabItem = item
  }

  changeSelectedTimespan(timespan: SelectedTimespan) {
    this.activeTimespanSub.next(timespan)
  }

  private generateFromToGranularity(timespan: SelectedTimespan) {
    var from = dayjs()
      var to = dayjs()
      var granularity = '1d'

      if(timespan === 'Today') {
        from = from.startOf('day')
        granularity = '1d'
      } else if(timespan === 'Yesterday') {
        from = from.startOf('day').subtract(1, 'days')
        to = to.startOf('day')
        granularity = '1d'
      } else if(timespan === '7D') {
        from = from.subtract(7, 'days')
        granularity = '7d'
      } else if(timespan === '14D') {
        from = from.subtract(14, 'days')
        granularity = '14d'
      } else if(timespan === '30D') {
        from = from.subtract(30, 'days')
        granularity = '30d'
      } else if(timespan === '60D') {
        from = from.subtract(60, 'days')
        granularity = '60d'
      } else if(timespan === 'All') {
        from = from.subtract(1000, 'days'),
        granularity = '1000d'
      }

      return { from: from, to: to, granularity: granularity }
  }

  totalConnectedWallets$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {

      const timespanvars = this.generateFromToGranularity(timespan)

      return this.gqlClient.periodActiveWallets({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
        from: timespanvars.from.toISOString(),
        to: timespanvars.to.toISOString(),
        granularity: timespanvars.granularity,
        pagination: {
          limit: 1,
          offset: 0
        }
      })
    })
  )


  totalSuccessfulTransactions$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {
      const timespanVars = this.generateFromToGranularity(timespan)
      return this.gqlClient.totalSuccessfulTransactions({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
        from: timespanVars.from.toISOString(),
        to: timespanVars.to.toISOString(),
        granularity: timespanVars.granularity
      })
    })
  )

  totalTransactions$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {

      const timespanVars = this.generateFromToGranularity(timespan)

      return this.gqlClient.totalTransactions({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
        from: timespanVars.from.toISOString(),
        to: timespanVars.to.toISOString(),
        granularity: timespanVars.granularity
      })
    })
  )

  totalCancelledTransactions$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {
      const timespanVars = this.generateFromToGranularity(timespan)
      return this.gqlClient.totalCancelledTransactions({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
        from: timespanVars.from.toISOString(),
        to: timespanVars.to.toISOString(),
        granularity: timespanVars.granularity,
        pagination: {
          limit: 1,
          offset: 0
        }
      })
    })
  )

  newWalletsConnected$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {
      const timespanVars = this.generateFromToGranularity(timespan)
      return this.gqlClient.totalNewWallets({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
        from: timespanVars.from.toISOString(),
        to: timespanVars.to.toISOString(),
        granularity: timespanVars.granularity,
        pagination: {
          limit: 1,
          offset: 0
        }
      })
    })
  )


  campaigns$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.getUserWalletAndTransactionStats({
        projectId: project!.id,
        field: EventTrackerModelField.UTM_CAMPAIGN
      })
    }),
    map(campaigns => campaigns.slice(0, 4))
  )

  sessions$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listSessions({
        projectId: project!.id,
        pagination: {
          limit: 5,
          offset: 0
        }
      })
    }),
    map(sessions => {
      return sessions.map(session => {
        return {...session, firstEventDateTime: dayjs(session.firstEventDateTime)}
      })
    })
  )

  txHistory$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.findEvents({
        projectId: project!.id,
        filter: {
          tracker: {
            eventTracker: EventTracker.TX_REQUEST
          }
        },
        pagination: {
          limit: 5,
          offset: 0
        }
      })
    }),
    map(txs => txs.map(tx => tx as TxRequestEvent)),
    map(txs => txs.map(tx => {
      return {...tx, createdAt: dayjs(tx.createdAt)}
    }))
  )


  periodActiveWallets$ = this.analyticsService.periodActiveWallets()
  averageTransactionsPerUser$ = this.analyticsService.averageTransactionsPerUser()
  averageTransactions$ = this.analyticsService.averageTransactions()
  listWalletProviders$ = this.analyticsService.listWalletProviders()
  listBrowsers$ = this.analyticsService.listBrowsers()
  listCountries$ = this.analyticsService.listCountries()


  
  projectUserStats$ = combineLatest([
    this.projectService.currentProject$,
    this.activeTimespan$
  ]).pipe(
    switchMap(([project, timespan]) => {

      const timespanVals = this.generateFromToGranularity(timespan)

      return this.gqlClient.getProjectUserStats({
        projectId: project!.id,
        filter: this.generateTrackerFilters(),
      })
    })
  )

  getDropoffString(prev: number, current: number) {
    if(current === 0) { return "100" }
    if(prev === 0) { return "0" }
    return (((current / prev) * 100)).toFixed(0)
  }

  getRatio(total: number, current: number) {
    return (current / total) * 100
  }

  analyticsOverview$ = 
      this.analyticsService.analyticsOverview().pipe(
        map(result => JSON.stringify(result))
      )

  constructor(private analyticsService: AnalyticsService, private projectService: ProjectService, private gqlClient: GQLClient) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

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

type TabItem = 'metrics' | 'history'

type SelectedTimespan = 'Today' | 'Yesterday' | '7D' | '14D' | '30D' | '60D' | 'All'