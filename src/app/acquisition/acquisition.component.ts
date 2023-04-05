import { Component, OnInit } from '@angular/core';
import { UserConfig } from 'gridjs';

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

  gridConfig: UserConfig = {
    columns: [
      { name: 'Campaigns', sort: false },
      '+ Wallets', 
      'Connects', 
      'TXS', 
      'TX(S) %', 
      'TX(U) %', 
      'WConn(S) %', 
      'WConn(U) %'
    ],
    data: [
      ['Total', '732', '2432', '232', '21%', '73%', '22%', '11%'],
      ['TwitterAds-1', '550', '1700', '120', '37%','73%', '22%', '11%'],
      ['DiscordReferals-1', '550', '1700', '120', '37%','73%', '22%', '11%'],
      ['AdWords-3', '550', '1700', '120', '37%','73%', '22%', '11%'],
      ['Organic-1', '550', '1700', '120', '37%','73%', '22%', '11%'],
      ['Unattributed', '550', '1700', '120', '37%','73%', '22%', '11%'],
    ],
    sort: true,
    className: {
      container: 'pf-gridjs-container',
      table: 'pf-gridjs-table',
      th: 'pf-gridjs-th',
      td: 'pf-gridjs-td',
      header: 'pf-gridjs-header'
    }
  
  }

  handleCellClick(event: any) {

  }

  handleRowClick(event: any) {

  }

  constructor() { }

  ngOnInit(): void {
  }

  setActiveItem(item: string) {
    this.activeItem = item
  }

}
