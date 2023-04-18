import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';
import { ActivatedRoute } from '@angular/router';
import { Event, ErrorEvent, WalletConnectedEvent, TxRequestEvent, UserLandedEvent, SessionsEventInfo, EventTracker, EventFilter } from '../../shared/graphql/data-types';
import { getNetwork, Network } from 'src/app/shared/networks';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-logger-details',
  templateUrl: './error-logger-details.component.html',
  styleUrls: ['./error-logger-details.component.css']
})
export class ErrorLoggerDetailsComponent implements OnInit {

  eventFilter: EventFilter = {
    tracker: {
      sessionId: this.route.snapshot.params["id"]
    }
  }

  eventTracker = {
    userLanded: "1",
    walletConnected: "2"
  }

  session$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.listSessions({
        projectId: project!.id,
        filter: {
          tracker: {
            sessionId: this.route.snapshot.params["id"]
          }
        }
      })
    }),
    map(sessions => sessions.at(0))
  )



  castToErrorEvent(event: Event) {
    return (event as unknown) as ErrorEvent
  }

  getNetwork(chainID: number): Network | undefined {
    return getNetwork(chainID)
  }

  castToWalletConnectedEvent(event: Event) {
    return event as WalletConnectedEvent
  }

  castToTxRequestEvent(event: Event) {
    return event as TxRequestEvent
  }

  castToUserLandedEvent(event: Event) {
    return event as UserLandedEvent
  }

  session = this.location.getState() as SessionsEventInfo | undefined

  constructor(private gqlClient: GQLClient, private route: ActivatedRoute,
    private projectService: ProjectService, private location: Location) { }

  ngOnInit(): void {
    console.log(this.session)
  }

  getEventNameFromType(type: any) {
    switch(type) {
      case 'USER_LANDED': return "User Landed"
      case 'WALLET_CONNECT': return "Wallet Connected"
      case 'GENERIC_ERROR': return "Frontend Error"
      default: return "Unknown"
    }
  }

}

type EventType = 'USER_LANDED' | 'WALLET_CONNECT' | 'GENERIC_ERROR'