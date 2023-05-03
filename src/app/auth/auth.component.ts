import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { fadeNoExitAnimation } from '../shared/animations/fade.animation';
import { ModalService } from '../shared/modal/modal.service';
import { buttonLoadingSpinner } from '../shared/operators/button-loading-spinner.operator';
import { ProjectService } from '../shared/project.service';
import { AuthService } from './auth.service';
import { AuthResponseModel } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [fadeNoExitAnimation]
})
export class AuthComponent {

  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmpassword: new FormControl('', [Validators.minLength(8)])
  })
  
  authType$: Observable<AuthType> = this.route.queryParams.pipe(
    map(params => {
      return params['signup'] ?
        'signup' :
        'login'
    })
  )

  pricing$ = this.route.queryParams.pipe(
    map(params => params['pricing']),
    tap(res => {
      if(res) {
        localStorage.setItem(PRICING_HOLDER_KEY, res)
      }
    })
  )

  errorMessageSub = new BehaviorSubject<string | null>(null)
  errorMessage$ = this.errorMessageSub.asObservable()

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private modalService: ModalService,
    private router: Router) { }

  logInClicked(event: Event) {
    const controls = this.authForm.controls
    this.projectService.refreshCurrentProject(undefined)
    this.authService.logIn(controls.email.value!, controls.password.value!).pipe(
      buttonLoadingSpinner(event),
      catchError(err => { 
        if(err.error.message.includes("verified")) {
          this.router.navigate(['verify'], {
            queryParams: {
              email: this.authForm.controls.email.value
            }
          })
        }
        this.errorMessageSub.next(err.error.message) 
        controls.password.reset()
        return throwError(err) 
      })).subscribe(res => {
      res ? this.router.navigate(['console/analytics']) : ''
    })
  }

  signUpClicked(event: Event) {
    const controls = this.authForm.controls
    this.projectService.refreshCurrentProject(undefined)
    if(controls.confirmpassword.value !== controls.password.value) {
      this.modalService.openModal({
        title: "Mismatch",
        message: "Passwords don't match",
        type: "error"
      })
      return
    }
    this.authService.signUp(controls.email.value!, controls.password.value!).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe(res => {
      res ? this.router.navigate(['console/analytics']) : 
      this.router.navigate(
        ['verify'], 
        { 
          queryParams: { 
            email: this.authForm.controls.email.value,
            pricing: this.route.snapshot.queryParams['pricing']
          }
        }
      )
    })
  }

}

type AuthType = 'signup' | 'login'

export const PRICING_HOLDER_KEY = "PRICING_HOLDER_KEY"