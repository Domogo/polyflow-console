import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ethers } from 'ethers';
import { map, switchMap, tap } from 'rxjs';
import { ErrorEvent, Event } from '../shared/graphql/data-types';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  id = this.route.snapshot.params['id']

  event$ = this.gqlClient.findEventsById({ id: this.id }).pipe(
    map(event => { return {...event, createdAtParsed: new Date(event.createdAt)} }),
    tap(event => console.log(event))
  )

  castToErrorEvent(event: Event) { return event as ErrorEvent }

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private gqlClient: GQLClient) { }

  ngOnInit(): void {
  }

  fromWei(balance: string) {
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(8)
  }

  weiToGwei(balance: string) {
    return (parseFloat(balance) / 1000000000).toFixed(4)
  }

}
