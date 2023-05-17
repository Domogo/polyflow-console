import { AfterViewInit, Component, INJECTOR, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { IntTimespanValues } from '../../graphql/data-types';
import { Observable, combineLatest, first, map, tap } from 'rxjs';

type DatasetType = {
  label: string,
  data: Observable<IntTimespanValues[]>
}

@Component({
  selector: 'app-timespan-chart',
  templateUrl: './timespan-chart.component.html',
  styleUrls: ['./timespan-chart.component.css']
})
export class TimespanChartComponent implements AfterViewInit {

  @Input() legend = false
  @Input() datasets!: DatasetType[]
  @Input() refreshTrigger?: Observable<any>
  
  chartID = crypto.randomUUID()


  constructor() { }

  ngAfterViewInit() {
    combineLatest(this.datasets.map(set => set.data)).subscribe(data => {
      this.setChart(data)
    })
  }

  setChart(data: IntTimespanValues[][]) {
    const ctx: any = document.getElementById(this.chartID)

    var that = this
    function buildGradient(r: number, g: number, b: number) {

      const ctx: any = document.getElementById(that.chartID)

      var gradient = ctx.getContext('2d').createLinearGradient(0,0,0,400)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.03)`)
      gradient.addColorStop(0, `rgba(255,255,255,0.1)`)

      return { color: `rgba(${r}, ${g}, ${b}, 255)`, gradient: gradient }
    }

    const gradients = [
      buildGradient(129, 140, 248),
      buildGradient(52,211,153),
      buildGradient(167, 139, 250),
      buildGradient(192,132,252),
      buildGradient(232,121,249)
    ]


    const chartDatasets = data.map((dataset, index) => {
      return {
        label: this.datasets.at(index)?.label,
        data: dataset.map(data => data.value),
        backgroundColor: gradients.at(index)?.gradient,
        fill: true,
        borderColor: gradients.at(index)?.color,
        cubicInterpolationMode: "monotone" as any
      }
    })

    new Chart(ctx as any, {
      type: 'line',
      data: {
        labels: data.at(0)?.map(item => 
            { 
              return (new Date(item.from)).toLocaleDateString('en', { month: 'short', day: '2-digit' }) 
            }),
        datasets: chartDatasets
      },
      options: {
        plugins: {
          legend: {
            display: this.legend,
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
