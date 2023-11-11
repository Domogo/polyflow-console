import { Component, HostListener, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-console-holder',
  templateUrl: './console-holder.component.html',
  styleUrls: ['./console-holder.component.css'],
})
export class ConsoleHolderComponent implements OnInit {
  projectID$ = this.projectService.currentProject$.pipe(
    map((project) => project!.apiKey)
  );

  currentProject$ = this.projectService.currentProject$.pipe(
    tap((project) => {
      if (project === null) {
        this.widgetTogglerService.toggleProjectModal();
      }
    })
  );

  constructor(
    private widgetTogglerService: WidgetTogglerService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isSidebarFixed = false;
  }

  isSidebarVisible = this.router.url !== '/console/project-settings';

  toggleModal() {
    this.widgetTogglerService.toggleUpsellModal();
  }

  isSidebarFixed = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = window.scrollY;

    this.isSidebarFixed = scrollY > 100;
  }
}
