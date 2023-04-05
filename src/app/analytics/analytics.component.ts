import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { map, tap } from 'rxjs';
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
  

  totalTransactions$ =
    this.analyticsService.getTotalTransactions()

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
