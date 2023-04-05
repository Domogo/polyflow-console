import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';

@Component({
  selector: 'app-console-holder',
  templateUrl: './console-holder.component.html',
  styleUrls: ['./console-holder.component.css']
})
export class ConsoleHolderComponent implements OnInit {

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
