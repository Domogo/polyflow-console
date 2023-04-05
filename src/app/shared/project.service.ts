import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BASE_URL } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  static CURRENT_PROJECT_STORAGE_ID = 'PF_CURRENT_PROJECT'

  path = `${BASE_URL}/projects`

  private currentProjectSub = new BehaviorSubject<ProjectModel | null>(this.currentProject)
  currentProject$ = this.currentProjectSub.asObservable()

  public get currentProject() {
    const storedValue = localStorage.getItem(ProjectService.CURRENT_PROJECT_STORAGE_ID)
    if(storedValue) {
      return JSON.parse(storedValue) as ProjectModel
    }
    return null
  }

  private set currentProject(project: ProjectModel | null) {
    this.currentProjectSub.next(project)
    localStorage.setItem(ProjectService.CURRENT_PROJECT_STORAGE_ID, JSON.stringify(project))
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllProjectsForCurrentUser() {
    return this.http.get<ProjectsResponseModel>(this.path, AuthService.buildHeaders(['jwt'])).pipe(
      tap(res => console.log(res))
    )
  }

  createNewProject(name: string) {
    return this.http.post<ProjectModel>(this.path, {
        name: name
      }, 
      AuthService.buildHeaders(['jwt'])
    )
  }

  refreshCurrentProject(project?: ProjectModel) {
    if(project) { this.currentProject = project; return } 
    this.currentProject = null
  }
  
}

interface ProjectsResponseModel {
  projects: ProjectModel[]
}

export interface ProjectModel {
  apiKey?: string,
  createdAt: string,
  features: ProjectFeaturesHolder
  id: string,
  name: string,
  ownerId: string,
  whitelistedDomains: string[]
}

interface ProjectFeaturesHolder {
  compliance: boolean,
  connectWallet: boolean,
  errorMessages: boolean,
  gasStation: boolean,
  networkSwitcher: boolean
}