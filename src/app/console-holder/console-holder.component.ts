import { Component, HostListener, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';
import { NavigationEnd, Router } from '@angular/router';

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
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSidebarVisible$ = event.url !== '/console/project-settings';
      }
    });
  }

  ngOnInit(): void {
    this.isSidebarFixed = false;
  }

  toggleModal() {
    this.widgetTogglerService.toggleUpsellModal();
  }

  isSidebarVisible$ = this.router.url !== '/console/project-settings';
  isSidebarFixed = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = window.scrollY;

    this.isSidebarFixed = scrollY > 100;
  }
}
