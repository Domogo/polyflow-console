import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-timespan-chart',
  templateUrl: './timespan-chart.component.html',
  styleUrls: ['./timespan-chart.component.css']
})
export class TimespanChartComponent implements OnInit {

  @Input() chartTitle!: string

  constructor() { }

  ngOnInit(): void {

    const ctx: any = document.getElementById('chartHolder')

    var gradient = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient.addColorStop(0, 'rgba(129, 140, 248, 0.05)')
    gradient.addColorStop(1, 'rgba(255,255,255,0.2)')

    var gradient2 = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient2.addColorStop(0, 'rgba(52, 211, 153, 0.05)')
    gradient2.addColorStop(1, 'rgba(255,255,255,0.2)')

    var gradient3 = ctx.getContext('2d').createLinearGradient(0,0,0,400)
    gradient3.addColorStop(0, 'rgba(167, 139, 250,0.05)')
    gradient3.addColorStop(1, 'rgba(255,255,255,0.2)')

    const data = [37, 21, 22, 27, 45, 11, 23, 34, 39,11,27,12,15,17,21,23,32]
    const data2 = data.map(x => x+(Math.random() * 30))
    const data3 = data.map(x => x+(Math.random() * 30))

    new Chart(ctx as any, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
        datasets: [
          { 
            label: 'Firefox', 
            data: data, 
            backgroundColor: gradient, 
            fill: true,
            borderColor: 'rgb(129, 140, 248)',
            cubicInterpolationMode: 'monotone',
          },
          { 
            label: 'Brave', 
            data: data2, 
            backgroundColor: gradient2, 
            fill: true,
            borderColor: 'rgb(52, 211, 153)',
            cubicInterpolationMode: 'monotone',
          },
          { 
            label: 'Brave', 
            data: data3, 
            backgroundColor: gradient3, 
            fill: true,
            borderColor: 'rgba(167, 139, 250, 255)',
            cubicInterpolationMode: 'monotone',
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#9ca3af'
            }
          }
        },
        responsive: true,
        elements: {
          
        },
        scales: {
          x: {
            grid: {
              color: '#eef2ff'
            },
            beginAtZero: true,
            ticks: {
              color: '#94a3b8'
            }
          },
          y: {
            grid: {
              color: '#eef2ff'
            },
            min: 0,
            ticks: {
              maxTicksLimit: 5,
              color: '#e0e7ff'
            }
          }
        }
      }
    })
  }

}
