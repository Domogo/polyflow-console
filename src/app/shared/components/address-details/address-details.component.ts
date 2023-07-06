import { Component, OnInit } from '@angular/core';
import { EventFilter } from '../../graphql/data-types';
import { ActivatedRoute } from '@angular/router';
import { ChainExplorers } from '../../utility/chain-explorers';
import { GQLClient } from '../../graphql/graphql-client';
import { map } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {


  constructor(private route: ActivatedRoute, private gqlClient: GQLClient) { }

  walletAddress = this.route.snapshot.params['walletAddress']

  portfolio$ = this.gqlClient.getPortfolio({
    address: this.walletAddress
  }).pipe(
    map(portfolio => {
      return {...portfolio, updatedAt: dayjs(portfolio.updatedAt)}
    })
  )

  addressExplorerLink = ChainExplorers.generateBlockscanLink(this.walletAddress)

  ngOnInit(): void {
  }

  eventFilter: EventFilter = {
    wallet: {
      walletAddress: this.walletAddress
    }
  }

  parseFloat(num: string): number {
    return parseFloat(num)
  }

  formatValue(num: number): string {
    const nFormat = new Intl.NumberFormat();
    return nFormat.format(num)
  } 

}
