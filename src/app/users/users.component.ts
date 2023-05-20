import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { EventFilter } from '../shared/graphql/data-types';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private currentPageSub = new BehaviorSubject(0)
  currentPage$ = this.currentPageSub.asObservable()

  setPage(newPage: number) {
    this.currentPageSub.next(newPage)
  }

  users$ = combineLatest([
    this.projectService.currentProject$,
    this.currentPage$
  ]).pipe(
    switchMap(([project, page]) => this.gqlClient.listUsers({
      projectId: project!.id,
      pagination: {
        offset: (10 * page),
        limit: 10
      }
    })),
    map(users => users.map(user => { 
      return {
        ...user, 
        firstEventDateTimeParsed: new Date(user.firstEventDateTime),
        browsersUnique: new Set(user.devices.map(device => device.browser)),
        providrsUnique: new Set(user.devices.map(device => device.walletProvider)),
        countriesUnique: new Set(user.devices.map(device => device.country))
      } 
    }))
  )

  constructor(private gqlClient: GQLClient, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

}
