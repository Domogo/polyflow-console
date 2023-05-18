import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, LegendItem } from 'chart.js/auto';
import { UserConfig } from 'gridjs';
import { BehaviorSubject, combineLatest, delay, map, switchMap, tap } from 'rxjs';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { EventTrackerModelField, ProjectUserStats } from '../shared/graphql/data-types';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css'],
  animations: [fadeAnimation]
})
export class AcquisitionComponent implements OnInit {

  eventTrackerSub = new BehaviorSubject(EventTrackerModelField.UTM_CAMPAIGN)

  acquisitions$ = combineLatest([this.projectService.currentProject$, this.eventTrackerSub]).pipe(
    switchMap(([project, eventTracker]) => {
      return this.gqlClient.getUserWalletAndTransactionStats({
        projectId: project!.id,
        field: eventTracker
      })
    })
  )

  setDimension(name: string) {
    if(this.attributionDimensionSub.value === 'campaign') {
      this.selectedDimensionSub.next(name)
    }
  }

  selectedDimensionSub = new BehaviorSubject<string | null>("")
  selectedDimension$ = this.selectedDimensionSub.asObservable()

  wallets$ = combineLatest([this.projectService.currentProject$, this.selectedDimension$]).pipe(
    switchMap(([project, dimension]) => this.gqlClient.totalConnectedWallets({
      projectId: project!.id,
      filter: {
        tracker: {
          utmCampaign: dimension ?? ""
        }
      },
      granularity: '1d',
      from: new Date(new Date().setDate((new Date()).getDate() - 30)).toISOString(),
      to: (new Date()).toISOString()
    })),
    tap(res => console.log(res))
  )

  transactions$ = combineLatest([this.projectService.currentProject$, this.selectedDimension$]).pipe(
    switchMap(([project, dimension]) => this.gqlClient.totalTransactions({
      projectId: project!.id,
      filter: {
        tracker: {
          utmCampaign: dimension ?? ""
        }
      },
      granularity: '1d',
      from: new Date(new Date().setDate((new Date()).getDate() - 30)).toISOString(),
      to: (new Date()).toISOString()
    }))
  )

  isDimensionSelectorHidden = true

  toggleDimensionSelector() {
    this.isDimensionSelectorHidden = !this.isDimensionSelectorHidden
  }


  // chart$ = this.projectUserStats$.pipe(
  //   tap(stats => {
  //     this.chart = new Chart(document.getElementById('usageChart') as any, {
  //       type: 'doughnut',
  //       data: {
  //         labels: ['TOTAL USERS', 'CONNECTED WALLET', 'EXECUTED TX', 'MULTIPLE TXS'],
  //         datasets: [
  //           { label: 'Users', data: [stats.totalUsers, stats.usersWithConnectedWallet, stats.usersWithExecutedTx, stats.usersWithMultipleExecutedTx] }
  //         ]
  //       },
  //       options: {
  //         plugins: {
  //           legend: {
  //             position: 'right',
  //             labels: {
  //               color: '#4338ca',
  //               font: {
  //                 weight: '600',
  //                 family: 'Montserrat'
  //               }
  //             }
  //           }
  //         }, 
  //         responsive: true,
  //         maintainAspectRatio: false
  //       },
  //     })
  //   })
  // )

  attributionDimensionSub = new BehaviorSubject<AttributionDimension>('campaign')
  attributionDimension$ = this.attributionDimensionSub.asObservable()

  setAttributionDimension(dimension: AttributionDimension) {
    this.attributionDimensionSub.next(dimension)
   
    var tracker: EventTrackerModelField
    switch(dimension) {
      case 'campaign': tracker = EventTrackerModelField.UTM_CAMPAIGN; break;
      case 'source': tracker = EventTrackerModelField.UTM_SOURCE; break;
      case 'content': tracker = EventTrackerModelField.UTM_CONTENT; break;
      case 'medium': tracker = EventTrackerModelField.UTM_MEDIUM; break;
      case 'term': tracker = EventTrackerModelField.UTM_TERM; break;
      case 'path': tracker = EventTrackerModelField.PATH; break;
      case 'origin': tracker = EventTrackerModelField.ORIGIN; break;
    }

    this.isDimensionSelectorHidden = true
    
    this.eventTrackerSub.next(tracker)
  }

  getPercentageRatio(metric: number, total: number): string {
    return (metric / total * 100).toFixed(2)
  } 

  constructor(private gqlClient: GQLClient, private projectService: ProjectService) { }

  ngOnInit(): void {
    // this.chart$.subscribe()
  }

}

type AttributionDimension = 
        'campaign' 
          | 'source' 
          | 'content' 
          | 'medium' 
          | 'term' 
          | 'path'
          | 'origin'