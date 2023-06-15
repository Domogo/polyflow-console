import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, filter, map, switchMap } from 'rxjs';
import { browserIcons, getCountryCodeFromName, walletProviderIcons } from '../shared/graphics/icons';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ModalService } from '../shared/modal/modal.service';
import { ProjectService } from '../shared/project.service';
import { EventTracker } from '../shared/graphql/data-types';

@Component({
  selector: 'app-error-logger',
  templateUrl: './error-logger.component.html',
  styleUrls: ['./error-logger.component.css']
})
export class ErrorLoggerComponent implements AfterViewInit {

hidePassive = new FormControl(false, [])
onlyErrors = new FormControl(false, [])
walletSearch = new FormControl('', [])

currentPageSub = new BehaviorSubject(0)
currentPage$ = this.currentPageSub.asObservable()

setPage(newPage: number) {
  this.currentPageSub.next(newPage)
}

sessions$ = combineLatest([this.hidePassive.valueChanges, 
    this.onlyErrors.valueChanges, 
    this.walletSearch.valueChanges,
    this.projectService.currentProject$,
    this.currentPage$])
  .pipe(
    switchMap(([hidePassive, onlyErrors, walletQuery, project, page]) => {
      return this.gqlClient.listSessions({ 
        projectId: project!.id, 
        pagination: { limit: 10, offset: (page * 10) } ,
        filter: {
          wallet: {
            walletAddress: walletQuery?.length ? walletQuery! : undefined
          },
          tracker: {
            eventTracker: onlyErrors! ? EventTracker.GENERIC_ERROR : undefined
          }
        }
      }).pipe(
        map(sessions => {
          return sessions
            .filter(session => {
              if(!session.hasConnectedWallet && hidePassive) { return false }
              return true
            }).map(session => {
              return {...session, firstEventDateTime: new Date(session.firstEventDateTime)}
            })
        })
      )
    }),
    catchError(err => this.modalService.displayError(err))
  )

  constructor(private projectService: ProjectService, private gqlClient: GQLClient, private modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.hidePassive.setValue(false)
    this.onlyErrors.setValue(false)
    this.walletSearch.setValue('')
  }

  getFlag(name: string | undefined) {
    if(!name) { return "undefined" }
    const code = getCountryCodeFromName(name)
    return code ? code : "undefined"
  }

  getWalletIcon(name: string | undefined) {
    if(!name) { return "undefined" }
    const code = walletProviderIcons.get(name)
    return code ? code : "undefined"
  }

  getBrowserIcon(name: string | undefined) {
    if(!name) { return "undefined" }
    const code = browserIcons.get(name)
    return code ? code : "undefined"
  }

}
