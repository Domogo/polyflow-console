import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { buttonLoadingSpinner } from 'src/app/shared/operators/button-loading-spinner.operator';
import { PRICING_HOLDER_KEY } from '../auth.component';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {

  query = this.route.snapshot.queryParams["token"]
  email = this.route.snapshot.queryParams["email"]
  pricing = localStorage.getItem(PRICING_HOLDER_KEY)
  
  success = false

  constructor(private route: ActivatedRoute, private modalService: ModalService, private verifyService: VerifyService) { }

  verifyEmail(event: Event) {
    if(this.pricing) {
      this.verifyService.verifyEmail(this.query).pipe(
        buttonLoadingSpinner(event),
        catchError(err => this.modalService.displayError(err)),
      ).subscribe(_ => {
        this.success = true
        this.verifyService.openPricing(this.pricing!).subscribe((res) => {
          window.location.href = res
        })
      })
    }
    
  }

  resendVerificationEmail(event: Event) {
    this.verifyService.resendEmail(this.email).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe()
  }

}
