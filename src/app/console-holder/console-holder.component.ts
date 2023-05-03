import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';

@Component({
  selector: 'app-console-holder',
  templateUrl: './console-holder.component.html',
  styleUrls: ['./console-holder.component.css']
})
export class ConsoleHolderComponent implements OnInit {

  projectID$ = this.projectService.currentProject$.pipe(map(project => project!.apiKey))

  currentProject$ = this.projectService.currentProject$.pipe(
    tap(project => {
      if(project === null) { this.widgetTogglerService.toggleProjectModal() }
    })
  )

  constructor(private widgetTogglerService: WidgetTogglerService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    
  }

  toggleModal() {
    this.widgetTogglerService.toggleUpsellModal()
  }

}
