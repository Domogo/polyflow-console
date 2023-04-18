import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, LegendItem } from 'chart.js/auto';
import { UserConfig } from 'gridjs';
import { delay, map, switchMap, tap } from 'rxjs';
import { ProjectUserStats } from '../shared/graphql/data-types';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-acquisition',
  templateUrl: './acquisition.component.html',
  styleUrls: ['./acquisition.component.css']
})
export class AcquisitionComponent implements OnInit {

  items = [
    'Campaigns',
    'Sources',
    'Mediums',
    'Contents',
    'Terms'
  ]
  activeItem = 'Campaign'

  shorthandPeriods = [
    'Today',
    'Yesterday',
    'Week',
    'Month',
    '90D',
    '6M'
  ]

  trackingCodes = [
    { name: "By Campaign", codes: ['twitter-referals', 'discord-link', 'adwords-paid']},
    { name: "By Term", codes: ['nft-marketplace', 'nft-trader', 'nft-speculation']},
    { name: "By Medium", codes: ['email', 'ads', 'social']},
    { name: "By Source", codes: ['twitter', 'linkedin', 'discord']},
    { name: "By Content", codes: []}
  ]

  projectUserStats$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.getProjectUserStats({
      projectId: project!.id
    }))
  )

  chart: any

  chart$ = this.projectUserStats$.pipe(
    tap(stats => {
      this.chart = new Chart(document.getElementById("usageChart") as any, {
        type: 'doughnut',
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        },
        data: {
          labels: [
            'Landed',
            'Connected Wallets',
            'Executed TX',
            'Executed >1 TXs'
          ],
          datasets: [
            { label: 'Number of users', data: [stats.totalUsers, stats.usersWithConnectedWallet, stats.usersWithExecutedTx, stats.usersWithMultipleExecutedTx]}
          ]
        }
      })
    })
  )

  getPercentageRatio(metric: number, total: number): string {
    return (metric / total * 100).toFixed(2)
  } 

  constructor(private gqlClient: GQLClient, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.chart$.subscribe()
  }

  setActiveItem(item: string) {
    this.activeItem = item
  }

}
