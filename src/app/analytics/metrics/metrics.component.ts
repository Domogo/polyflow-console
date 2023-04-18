import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserConfig } from 'gridjs';
import { map, Observable, reduce, switchMap } from 'rxjs';
import { browserIcons, countryIcons, getCountryCodeFromName, walletProviderIcons } from 'src/app/shared/graphics/icons';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
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
    })
  )
  
  browser$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listBrowsers({
        projectId: project!.id
      })
    })
  )

  walletProviders$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listWalletProviders({
        projectId: project!.id
      })
    })
  )
  
  


  totalConnections$ = this.countries$.pipe(
    map(countries => {
      var sum = 0
      countries.forEach(country => { sum += country.totalWalletConnections })
      return sum
    })
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
