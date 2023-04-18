import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { getIcon, IconType } from 'src/app/shared/graphics/icons';
import { EventTracker, TxRequestEvent } from 'src/app/shared/graphql/data-types';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-txhistory',
  templateUrl: './txhistory.component.html',
  styleUrls: ['./txhistory.component.css']
})
export class TxhistoryComponent implements OnInit {

  txHistory: TxHistoryModel[] = [
    
  ]

  txHistory$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.findEvents({
      projectId: project!.id,
      filter: {
        tracker: {
          eventTracker: EventTracker.TX_REQUEST
        }
      }
    })),
    map(events => events.map(event => event as TxRequestEvent)),
    map(events => events.map(event => { 
        return {...event, 
          tx: {...event.tx, gasPrice: this.gasPriceToGwei(event.tx.gasPrice) } 
        } 
      }).map(event => { return {...event, createdAt: new Date(event.createdAt)}})
    )
  )

  _getIcon(type: IconType, query: string): string | undefined {
    return getIcon(type, query)
  }

  constructor(private gqlClient: GQLClient, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  private gasPriceToGwei(gasPrice: string) {
    return (parseInt(gasPrice) / 1000000000)
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