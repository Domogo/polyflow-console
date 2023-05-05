import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap, throwError } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { buttonLoadingSpinner } from 'src/app/shared/operators/button-loading-spinner.operator';
import { PRICING_HOLDER_KEY } from '../auth.component';
import { AuthResponseModel, AuthService } from '../auth.service';
import { VerifyService } from './verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  query = this.route.snapshot.queryParams["token"]
  email = this.route.snapshot.queryParams["email"]
  pricing = localStorage.getItem(PRICING_HOLDER_KEY)
  
  success = false

  apiToken$ = this.authService.apiToken$

  constructor(private route: ActivatedRoute, 
    private modalService: ModalService,
    private verifyService: VerifyService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.pipe(
      tap(user => {
        if(this.route.snapshot.queryParams['existingUser']) {
          this.success = true
        }
      })
    ).subscribe()
    if(this.pricing && this.query) {
      this.verifyEmail()
    }
  }

  verifyEmail(event?: Event) {
    if(this.pricing) {
      this.verifyService.verifyEmail(this.query).pipe(
        buttonLoadingSpinner(event),
        catchError(err => this.modalService.displayError(err)),
      ).subscribe((res: AuthResponseModel) => {
        this.success = true
        this.authService.setUser(res)
      })
    }
  }

  proceedToPaymentClicked(pricing: string, event?: Event) {
    const priceID = this.getPriceIDForPricing(pricing.toLowerCase())
    this.verifyService.openPricing(pricing).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe((res) => {
      window.location.href = res
    })
  }

  getPriceIDForPricing(pricing: string) {
    if(pricing === 'pro') {
      return 'price_1N3LQ6KxKxZbxAZBTUnbDlLZ'
    } else if(pricing === 'indie') {
      return 'price_1N3LQaKxKxZbxAZBnitx6dJk'
    } else if(pricing === 'business') {
      return 'price_1N3LQsKxKxZbxAZBCX2axj2A'
    }
    return ''
  }

  changePricingClicked(pricing: string) {
    this.pricing = pricing
  }

  resendVerificationEmail(event: Event) {
    this.verifyService.resendEmail(this.email).pipe(
      buttonLoadingSpinner(event),
      catchError(err => this.modalService.displayError(err))
    ).subscribe()
  }

}
