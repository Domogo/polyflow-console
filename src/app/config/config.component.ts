import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, Observable, of, pipe, tap } from 'rxjs';
import { ConfigService } from '../shared/config.service';
import { ModalService } from '../shared/modal/modal.service';
import { buttonLoadingSpinner } from '../shared/operators/button-loading-spinner.operator';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({height: '0'}),
        animate('100ms ease-in-out', 
          style({height: '*'})
        )
      ]),
      transition(':leave', [
        animate('100ms ease-in-out', style({height: '0'})),
      ])
    ])
  ]
})
export class ConfigComponent implements OnInit {

  project$ = this.projectService.currentProject$
  newWhitelistForm = new FormControl('', [Validators.required])

  constructor(private projectService: ProjectService,
    private configService: ConfigService,
    private modalService: ModalService) { }

  ngOnInit(): void {
  }

  createAPIKey(event: Event){
    this.configService.createAPIKey().pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe()
  }

  deleteAPIKey(event: Event) {
    this.configService.deleteAPIKey().pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe()
  }

  addWhitelistDomain(event: Event) {
    this.configService.addWhitelistDomain(this.newWhitelistForm.value!).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err)),
      tap(_ => this.newWhitelistForm.setValue(''))
    ).subscribe()
  }

  removeWhitelistDomain(domain: string, event: Event) {
    this.configService.removeWhitelistedDomain(domain).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe()
  }

  generatePasteScript(apiKey: string) {
    return `<script src='https://sdk.polyflow.dev/generate?api=${apiKey}' async></script>`
  }

}
