import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { fadeAnimation, fadeNoExitAnimation } from '../shared/animations/fade.animation';
import { ModalService } from '../shared/modal/modal.service';
import { ProjectModel, ProjectService } from '../shared/project.service';
import { WidgetTogglerService } from '../widget-toggler-service';

@Component({
  selector: 'app-project-switcher',
  templateUrl: './project-switcher.component.html',
  styleUrls: ['./project-switcher.component.css'],
  animations: [
    fadeAnimation,
    fadeNoExitAnimation
  ]
})
export class ProjectSwitcherComponent implements OnInit {

  isHidden$ = this.widgetTogglerService.isProjectModalHidden$
  projectCreationToggled = false

  apiToken$ = this.authService.apiToken$
  projects$ = this.projectService.getAllProjectsForCurrentUser()

  projectNameForm = new FormControl('', [Validators.required])

  constructor(private widgetTogglerService: WidgetTogglerService,
    private authService: AuthService,
    private modalService: ModalService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  toggleVisibility() {
    this.widgetTogglerService.toggleProjectModal()
  }

  toggleProjectCreation() {
    this.projectCreationToggled = !this.projectCreationToggled
  }

  createProjectClicked() {
    this.projectService.createNewProject(this.projectNameForm.value!).subscribe(res => {
      this.projectService.refreshCurrentProject(res)
      this.widgetTogglerService.toggleProjectModal()
      this.projectCreationToggled = false
    })
  }

  setNewProject(project: ProjectModel) {
    this.projectCreationToggled = false
    this.projectService.refreshCurrentProject(project)
    this.widgetTogglerService.toggleProjectModal()
  }

}
