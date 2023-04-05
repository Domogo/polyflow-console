import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isProjectSwitcherHidden$ = this.widgetTogglerService.isProjectModalHidden$
  currentProject$ = this.projectService.currentProject$
  user$ = this.authService.user$

  constructor(private widgetTogglerService: WidgetTogglerService,
    private authService: AuthService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut()
  }

  projectSwitchClicked() {
    this.widgetTogglerService.toggleProjectModal()
  }

  toggleModal() {
    this.widgetTogglerService.toggleUpsellModal()
  }

}
