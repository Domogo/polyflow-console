import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { ErrorEvent, Event, EventFilter, EventTracker, TxRequestEvent, UserLandedEvent, WalletConnectedEvent } from '../../graphql/data-types';
import { GQLClient } from '../../graphql/graphql-client';
import { getNetwork } from '../../networks';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  @Input() eventFilter!: EventFilter

  eventTypeFilterForm = new FormGroup({
    walletConnected: new FormControl(true, []),
    userLanded: new FormControl(true, []),
    genericError: new FormControl(true, []),
    txRequested: new FormControl(true, [])
  })

  events$ = combineLatest([this.eventTypeFilterForm.valueChanges, this.projectService.currentProject$]).pipe(
    switchMap(([filter, project]) => {
      return this.gqlClient.findEvents({
        projectId: project!.id,
        filter: this.eventFilter
      })
    }),
    map(events => {
      return events.map(event => { return {...event, createdAtParsed: new Date(event.createdAt)} })
        .filter(event => {
          const tracker = event.tracker.eventTracker
          const controls = this.eventTypeFilterForm.controls
          if(controls.userLanded.value) { if(tracker === EventTracker.USER_LANDED) { return true } }
          if(controls.genericError.value) { if(tracker === EventTracker.GENERIC_ERROR) { return true } }
          if(controls.walletConnected.value) { if(tracker === EventTracker.WALLET_CONNECT) { return true} }
          if(controls.txRequested.value) { if(tracker === EventTracker.TX_REQUEST ) { return true } }
          return false
        })
    })
  )

  constructor(private projectService: ProjectService, private gqlClient: GQLClient, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const controls = this.eventTypeFilterForm.controls
    setTimeout(() => {
      controls.walletConnected.setValue(true)
      controls.genericError.setValue(true)
      controls.userLanded.setValue(true)
      controls.txRequested.setValue(true)
    }, 200);
    

  }

  castToErrorEvent(event: Event): ErrorEvent {
    return event as ErrorEvent
  }

  castToTxRequestEvent(event: Event) {
    return event as TxRequestEvent
  }

  getNetwork(chainID: number) {
    return getNetwork(chainID)
  }

  castToWalletConnectedEvent(event: Event) {
    return event as WalletConnectedEvent
  }

  castToUserLandedEvent(event: Event) {
    return event as UserLandedEvent
  }

}
