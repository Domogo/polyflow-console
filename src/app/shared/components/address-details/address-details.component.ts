import { Component, OnInit } from '@angular/core';
import { EventFilter } from '../../graphql/data-types';
import { ActivatedRoute } from '@angular/router';
import { ChainExplorers } from '../../utility/chain-explorers';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  walletAddress = this.route.snapshot.params['walletAddress']

  addressExplorerLink = ChainExplorers.generateLinkForAddress(this.walletAddress, 1)

  ngOnInit(): void {
  }

  eventFilter: EventFilter = {
    wallet: {
      walletAddress: this.walletAddress
    }
  }

}
