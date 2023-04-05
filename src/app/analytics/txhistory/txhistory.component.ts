import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-txhistory',
  templateUrl: './txhistory.component.html',
  styleUrls: ['./txhistory.component.css']
})
export class TxhistoryComponent implements OnInit {

  txHistory: TxHistoryModel[] = [
    {
      hash: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      time: '02.07.2022 11:32:21',
      wallet: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      type: 'Coin',
      country: 'Albania',
      browser: 'Chrome'
    },
    {
      hash: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      time: '02.07.2022 11:32:21',
      wallet: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      type: 'Contract',
      country: 'Switzerland',
      browser: 'Firefox'
    },
    {
      hash: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      time: '02.07.2022 11:32:21',
      wallet: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      type: 'Coin',
      country: 'Germany',
      browser: 'Safari'
    },
    {
      hash: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      time: '02.07.2022 11:32:21',
      wallet: '0x95F56ce6cbf39E91078f2C4EDe75962BF9087A58',
      type: 'Contract',
      country: 'Spain',
      browser: 'Firefox'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

interface TxHistoryModel {
  hash: string,
  time: string,
  wallet: string,
  type: TxTypeModel,
  country: string,
  browser: BrowserType
}

type TxTypeModel = 'Contract' | 'Coin'
type BrowserType = 'Chrome' | 'Firefox' | 'Safari' | 'Edge' | 'Other'