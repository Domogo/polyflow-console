import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { ErrorEvent, Event, EventFilter, TxRequestEvent, UserLandedEvent, WalletConnectedEvent } from '../../graphql/data-types';
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

  events$ = this.projectService.currentProject$.pipe(
    switchMap(project => {
      return this.gqlClient.findEvents({
        projectId: project!.id,
        filter: this.eventFilter
      })
    }),
    map(events => {
      return events.map(event => { return {...event, createdAtParsed: new Date(event.createdAt)} })
    })
  )

  constructor(private projectService: ProjectService, private gqlClient: GQLClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
