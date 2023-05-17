import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserConfig } from 'gridjs';
import { map, Observable, reduce, share, shareReplay, switchMap, tap } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations/fade.animation';
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


  countries$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listCountries({
        projectId: project!.id
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
        projectId: project!.id
      })
    }),
    shareReplay(1)
  )

  walletProviders$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listWalletProviders({
        projectId: project!.id
      })
    }),
    shareReplay(1)
  )
  
  wallets$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.totalConnectedWallets({
      projectId: project!.id,
      granularity: '1d',
      from: new Date(new Date().setDate((new Date()).getDate() - 30)).toISOString(),
      to: (new Date()).toISOString()
    })),
    shareReplay(1)
  )

  txs$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.totalTransactions({
      projectId: project!.id,
      granularity: '1d',
      from: new Date(new Date().setDate((new Date()).getDate() - 30)).toISOString(),
      to: (new Date()).toISOString()
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

  
}
