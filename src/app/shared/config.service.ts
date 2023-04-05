import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from '../environments/environments';
import { ProjectModel, ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  path = `${BASE_URL}/projects`

  constructor(private http: HttpClient,
    private projectService: ProjectService) { }

  createAPIKey() {
    return this.projectService.currentProject$.pipe(
      first(),
      switchMap(project => {
        return project !== null ? 
          this.http.post<ProjectModel>(`${this.path}/${project.id}/api-key`, { }, AuthService.buildHeaders(['jwt'])) :
          of(undefined)
      }),
      tap(project => {
        this.projectService.refreshCurrentProject(project)
      })
    )
  }

  deleteAPIKey() {
    return this.projectService.currentProject$.pipe(
      first(),
      switchMap(project => {
        return project !== null ?
          this.http.delete<ProjectModel>(`${this.path}/${project.id}/api-key`, AuthService.buildHeaders(['jwt'])):
          of(undefined)
      }),
      tap(project => {
        this.projectService.refreshCurrentProject(project)
      })
    )
  }

  addWhitelistDomain(domain: string) {
    return this.projectService.currentProject$.pipe(
      first(),
      switchMap(project => {
        return project !== null ?
          this.http.patch<ProjectModel>(`${this.path}/${project.id}/domains/add`, {
            domain: domain
          }, AuthService.buildHeaders(['jwt'])) :
          of(undefined)
      }),
      tap(project => this.projectService.refreshCurrentProject(project))
    )
  }

  removeWhitelistedDomain(domain: string) {
    return this.projectService.currentProject$.pipe(
      first(),
      switchMap(project => {
        return project !== null ?
          this.http.patch<ProjectModel>(`${this.path}/${project.id}/domains/delete`, {
            domain: domain
          }, AuthService.buildHeaders(['jwt'])) :
          of(undefined)
      }),
      tap(project => this.projectService.refreshCurrentProject(project))
    )
  }
}
