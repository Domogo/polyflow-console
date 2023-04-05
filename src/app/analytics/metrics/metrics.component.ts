import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
      new Chart(
        document.getElementById('walletProvidersChartHolder')! as HTMLCanvasElement, 
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'left'
              }
            }
          },
          type: 'pie',
          data: {
            labels: ['MetaMask', 'WalletConnect', 'Magic Wallet', 'Ambire', 'Rainbow'],
            datasets: [
              {
                label: 'Transactions',
                data: [720,130,80,23,7]
              }
            ]
          }
        }
      )
      new Chart(
        document.getElementById('countriesChartHolder')! as HTMLCanvasElement, 
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                  color: 'rgba(0,0,0,0.3)'
                }
              },
              y: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.02)'
                },
                ticks :{
                  maxTicksLimit: 4,
                  color: 'rgba(0,0,0,0.3)'
                }
              }
            }
          },
          type: 'bar',
          data: {
            labels: ['Yugoslavia', 'USSR', 'DPRK', 'Siam', 'Rhodesia'],
            datasets: [
              {
                label: 'Transactions',
                data: [200,130,300,23,450],
                backgroundColor: ['rgb(80,80,200)']
              }
            ]
          }
        }
      )
      new Chart(
        document.getElementById('browsersChartHolder')! as HTMLCanvasElement, 
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'left'
              }
            }
          },
          type: 'pie',
          data: {
            labels: ['Chrome', 'Firefox', 'Brave', 'Safari', 'Opera'],
            datasets: [
              {
                label: 'Transactions',
                data: [850,220,350,230,450]
              }
            ]
          }
        }
      )
      new Chart(
        document.getElementById('failedChartHolder')! as HTMLCanvasElement, 
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                  maxTicksLimit: 4,
                  color: 'rgba(0,0,0,0.3)'
                }
              },
              y: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks :{
                  maxTicksLimit: 4,
                  color: 'rgba(0,0,0,0.3)'
                }
              }
            }
          },
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'ETH',
                data: [8,3,12,7,8,2,4],
              },
              {
                label: 'AVAX',
                data: [3,1,8,5,3,2,8],
              },
              {
                label: 'OP',
                data: [1,2,3,2,4,7,4],
              },
              {
                label: 'Total',
                data: [12,6,18,15,20,13,12],
              }
            ]
          }
        }
      )

      new Chart(
        document.getElementById('gasPriceChartHolder')! as HTMLCanvasElement, 
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                  maxTicksLimit: 4,
                  color: 'rgba(0,0,0,0.3)'
                }
              },
              y: {
                display: true,
                grid: {
                  color: 'rgba(0,0,0,0.05)'
                },
                ticks :{
                  maxTicksLimit: 4,
                  color: 'rgba(0,0,0,0.3)'
                }
              }
            }
          },
          type: 'line',
          data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
            datasets: [
              {
                label: 'ETH',
                data: [8,3,12,7,8,2,4,8,2,3,7,12,3],
              },
              {
                label: 'AVAX',
                data: [3,1,8,5,3,2,8,8,2,3,8,5,6,3],
              },
              {
                label: 'OP',
                data: [1,2,3,2,4,7,4,2,3,3,4,5,2],
              }
            ]
          }
        }
      )
    
  }

}
