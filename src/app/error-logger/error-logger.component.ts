import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { browserIcons, getCountryCodeFromName, walletProviderIcons } from '../shared/graphics/icons';
import { GQLClient } from '../shared/graphql/graphql-client';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-error-logger',
  templateUrl: './error-logger.component.html',
  styleUrls: ['./error-logger.component.css']
})
export class ErrorLoggerComponent implements AfterViewInit {

  hidePassive = new FormControl(false, [])
  onlyErrors = new FormControl(false, [])
  walletSearch = new FormControl('', [])

  sessions$ = combineLatest([this.hidePassive.valueChanges, 
    this.onlyErrors.valueChanges, 
    this.walletSearch.valueChanges,
    this.projectService.currentProject$])
  .pipe(
    switchMap(([hidePassive, onlyErrors, walletQuery, project]) => {
      return this.gqlClient.listSessions({ projectId: project!.id }).pipe(
        map(sessions => {
          return sessions
            .filter(session => {
              if(!session.hasConnectedWallet && hidePassive) { return false }
              return true
            }).filter(session => {
              const noError = session.totalErrorEventCount === 0
              if(onlyErrors && noError) { return false }
              return true
            }).filter(session => {
              const addresses = session.walletAddresses.map(address => address.toUpperCase())
              if(!walletQuery) { return true }
              if(walletQuery.length !== 42) { return true }
              if(addresses.includes(walletQuery.toUpperCase())) { return true }
              return false
            }).map(session => {
              return {...session, firstEventDateTime: new Date(session.firstEventDateTime)}
            }).sort((first, second) => {
              return (second.firstEventDateTime.getTime() - first.firstEventDateTime.getTime())
            })
        })
      )
    })
  )

  constructor(private projectService: ProjectService, private gqlClient: GQLClient) { }

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
