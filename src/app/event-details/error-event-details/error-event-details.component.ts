import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ErrorEvent, Event } from 'src/app/shared/graphql/data-types';
import { GQLClient } from 'src/app/shared/graphql/graphql-client';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-error-event-details',
  templateUrl: './error-event-details.component.html',
  styleUrls: ['./error-event-details.component.css']
})
export class ErrorEventDetailsComponent implements OnInit {

  @Input() event!: ErrorEvent

  constructor(private gqlClient: GQLClient, private projectService: ProjectService) { }

  ngOnInit(): void { }
  


}
