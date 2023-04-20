import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.listUsers({
      projectId: project!.id
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
