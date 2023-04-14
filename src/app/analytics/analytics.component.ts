import { AfterViewInit, Component } from '@angular/core';
import { map } from 'rxjs';
import { countryIcons } from '../shared/graphics/icons';
import { genericSpinnerOnElement } from '../shared/operators/button-loading-spinner.operator';
import { AnalyticsService } from './analytics.service';

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

  analyticsOverview$ = 
      this.analyticsService.analyticsOverview().pipe(
        map(result => JSON.stringify(result))
      )

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  
  }

  

  ngAfterViewInit(): void {

  }

}

type TabItem = 'metrics' | 'history'
