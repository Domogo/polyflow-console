import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { EventFilter } from 'src/app/shared/graphql/data-types';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  eventFilter: EventFilter = {
    tracker: {
      userId: this.route.snapshot.params["id"]
    }
  }

  user$ = this.projectService.currentProject$.pipe(
    switchMap(project => this.gqlClient.listUsers({
      projectId: project!.id,
      filter: {
        tracker: {
          userId: this.route.snapshot.params['id']
        }
      }
    })),
    map(users => users.at(0))
  )

  constructor(private projectService: ProjectService, 
    private gqlClient: GQLClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
