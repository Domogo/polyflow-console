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
    const countryCode = getCountryCodeFromName(nameC)
    if(countryCode) { return countryCode }
    return "undefined"
  }

  getBrowserIcon(name: string): string | undefined {
    return browserIcons.get(name)
  }

  getWalletIcon(name: string): string | undefined {
    return walletProviderIcons.get(name)
  }

  // ngAfterViewInit(): void {
  //     new Chart(
  //       document.getElementById('walletProvidersChartHolder')! as HTMLCanvasElement, 
  //       {
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               position: 'left'
  //             }
  //           }
  //         },
  //         type: 'pie',
  //         data: {
  //           labels: ['MetaMask', 'WalletConnect', 'Magic Wallet', 'Ambire', 'Rainbow'],
  //           datasets: [
  //             {
  //               label: 'Transactions',
  //               data: [720,130,80,23,7]
  //             }
  //           ]
  //         }
  //       }
  //     )
  //     new Chart(
  //       document.getElementById('countriesChartHolder')! as HTMLCanvasElement, 
  //       {
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               position: 'bottom'
  //             }
  //           },
  //           scales: {
  //             x: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.05)'
  //               },
  //               ticks: {
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             },
  //             y: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.02)'
  //               },
  //               ticks :{
  //                 maxTicksLimit: 4,
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             }
  //           }
  //         },
  //         type: 'bar',
  //         data: {
  //           labels: ['Yugoslavia', 'USSR', 'DPRK', 'Siam', 'Rhodesia'],
  //           datasets: [
  //             {
  //               label: 'Transactions',
  //               data: [200,130,300,23,450],
  //               backgroundColor: ['rgb(80,80,200)']
  //             }
  //           ]
  //         }
  //       }
  //     )
  //     new Chart(
  //       document.getElementById('browsersChartHolder')! as HTMLCanvasElement, 
  //       {
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               position: 'left'
  //             }
  //           }
  //         },
  //         type: 'pie',
  //         data: {
  //           labels: ['Chrome', 'Firefox', 'Brave', 'Safari', 'Opera'],
  //           datasets: [
  //             {
  //               label: 'Transactions',
  //               data: [850,220,350,230,450]
  //             }
  //           ]
  //         }
  //       }
  //     )
  //     new Chart(
  //       document.getElementById('failedChartHolder')! as HTMLCanvasElement, 
  //       {
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               position: 'bottom'
  //             }
  //           },
  //           scales: {
  //             x: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.05)'
  //               },
  //               ticks: {
  //                 maxTicksLimit: 4,
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             },
  //             y: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.05)'
  //               },
  //               ticks :{
  //                 maxTicksLimit: 4,
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             }
  //           }
  //         },
  //         type: 'line',
  //         data: {
  //           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //           datasets: [
  //             {
  //               label: 'ETH',
  //               data: [8,3,12,7,8,2,4],
  //             },
  //             {
  //               label: 'AVAX',
  //               data: [3,1,8,5,3,2,8],
  //             },
  //             {
  //               label: 'OP',
  //               data: [1,2,3,2,4,7,4],
  //             },
  //             {
  //               label: 'Total',
  //               data: [12,6,18,15,20,13,12],
  //             }
  //           ]
  //         }
  //       }
  //     )

  //     new Chart(
  //       document.getElementById('gasPriceChartHolder')! as HTMLCanvasElement, 
  //       {
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               position: 'bottom'
  //             }
  //           },
  //           scales: {
  //             x: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.05)'
  //               },
  //               ticks: {
  //                 maxTicksLimit: 4,
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             },
  //             y: {
  //               display: true,
  //               grid: {
  //                 color: 'rgba(0,0,0,0.05)'
  //               },
  //               ticks :{
  //                 maxTicksLimit: 4,
  //                 color: 'rgba(0,0,0,0.3)'
  //               }
  //             }
  //           }
  //         },
  //         type: 'line',
  //         data: {
  //           labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
  //           datasets: [
  //             {
  //               label: 'ETH',
  //               data: [8,3,12,7,8,2,4,8,2,3,7,12,3],
  //             },
  //             {
  //               label: 'AVAX',
  //               data: [3,1,8,5,3,2,8,8,2,3,8,5,6,3],
  //             },
  //             {
  //               label: 'OP',
  //               data: [1,2,3,2,4,7,4,2,3,3,4,5,2],
  //             }
  //           ]
  //         }
  //       }
  //     )
    
  // }

}
