import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { buttonLoadingSpinner } from 'src/app/shared/operators/button-loading-spinner.operator';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  query = this.route.snapshot.queryParams["token"]
  email = this.route.snapshot.queryParams["email"]
  
  success = false

  constructor(private route: ActivatedRoute, private verifyService: VerifyService) { }

  verifyEmail(event: Event) {
    this.verifyService.verifyEmail(this.query).pipe(
      buttonLoadingSpinner(event),
      catchError(error => {
        alert(JSON.stringify(error))
        return throwError(() => {})
      })
    ).subscribe(res => {
      this.success = true
    })
  }

  resendVerificationEmail(event: Event) {
    this.verifyService.resendEmail(this.email).pipe(
      buttonLoadingSpinner(event),
      catchError(error => {
        alert(JSON.stringify(error))
        return throwError(() => { })
      })
    ).subscribe()
  }

}
