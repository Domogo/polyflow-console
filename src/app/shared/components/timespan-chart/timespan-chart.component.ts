import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { IntTimespanValues } from '../../graphql/data-types';

@Component({
  selector: 'app-timespan-chart',
  templateUrl: './timespan-chart.component.html',
  styleUrls: ['./timespan-chart.component.css']
})
export class TimespanChartComponent implements AfterViewInit {

  @Input() chartTitle!: string

  @Input() values!: IntTimespanValues[]
  chartID = crypto.randomUUID()

  constructor() { }

  ngAfterViewInit() {

    const ctx: any = document.getElementById(this.chartID)

    var gradient = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient.addColorStop(0, 'rgba(129, 140, 248, 0.03)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.1)')

    var gradient2 = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient2.addColorStop(0, 'rgba(52, 211, 153, 0.03)')
    gradient2.addColorStop(1, 'rgba(255,255,255,0.1)')

    var gradient3 = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient3.addColorStop(0, 'rgba(167, 139, 250,0.03)')
    gradient3.addColorStop(1, 'rgba(255,255,255,0.1)')


    const labels = 
      this.values.map(value => {
        return  `${new Date(value.from).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })}`
      })
    const dataset = this.values.map(value => value.value)

    new Chart(ctx as any, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          { 
            label: this.chartTitle, 
            data: dataset, 
            backgroundColor: gradient, 
            fill: true,
            borderColor: 'rgb(129, 140, 248)',
            cubicInterpolationMode: 'monotone',
          }

        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#9ca3af'
            }
          }
        },
        responsive: true,
        scales: {
          x: {
            grid: {
              color: '#f0f9ff'
            },
            beginAtZero: true,
            ticks: {
              color: '#94a3b8',
              autoSkip: true,
              maxTicksLimit: 10,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: {
              color: '#f0f9ff'
            },
            min: 0,
            ticks: {
              maxTicksLimit: 10,
              color: '#94a3b8'
            }
          }
        }
      }
    })

    return true
  }

}
