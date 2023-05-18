import { AfterViewInit, Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { countryIcons } from '../shared/graphics/icons';
import { genericSpinnerOnElement } from '../shared/operators/button-loading-spinner.operator';
import { AnalyticsService } from './analytics.service';
import { ProjectService } from '../shared/project.service';
import { GQLClient } from '../shared/graphql/graphql-client';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  activeTabItem: TabItem = 'metrics'

  changeTab(item: TabItem) {
    this.activeTabItem = item
  }

  totalConnectedWallets$ = 
    this.analyticsService.getTotalConnectedWallets().pipe(
      genericSpinnerOnElement(document.getElementById("totalTransactions"))
    )

  allEvents$ = this.analyticsService.getAllEvents()
  newWalletsConnected$ = this.analyticsService.newWalletsConnected()
  periodActiveWallets$ = this.analyticsService.periodActiveWallets()
  totalTransactions$ = this.analyticsService.getTotalTransactions()
  totalSuccessfulTransactions$ = this.analyticsService.totalSuccessfulTransactions()
  totalCancelledTransactions$ = this.analyticsService.totalCancelledTransactions()
  averageTransactionsPerUser$ = this.analyticsService.averageTransactionsPerUser()
  averageTransactions$ = this.analyticsService.averageTransactions()
  minTransactionsInPeriod$ = this.analyticsService.minTransactionsInPeriod()
  maxTransactionsInPeriod$ = this.analyticsService.maxTransactionsInPeriod()
  listWalletProviders$ = this.analyticsService.listWalletProviders()
  listBrowsers$ = this.analyticsService.listBrowsers()
  listCountries$ = this.analyticsService.listCountries()


  projectUserStats$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.getProjectUserStats({
      projectId: project!.id
    }))
  )

  getDropoffString(prev: number, current: number) {
    if(current === 0) { return "100" }
    if(prev === 0) { return "0" }
    return (100 - ((current / prev) * 100)).toFixed(0)
  }

  getRatio(total: number, current: number) {
    return (current / total) * 100
  }

  analyticsOverview$ = 
      this.analyticsService.analyticsOverview().pipe(
        map(result => JSON.stringify(result))
      )

  constructor(private analyticsService: AnalyticsService, private projectService: ProjectService, private gqlClient: GQLClient) { }

  ngOnInit(): void {
  
  }

  

  ngAfterViewInit(): void {

  }

}

type TabItem = 'metrics' | 'history'
