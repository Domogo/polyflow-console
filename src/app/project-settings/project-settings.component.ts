import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payment/payments.service';
import { buttonLoadingSpinner } from '../shared/operators/button-loading-spinner.operator';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent implements OnInit {

  constructor(private paymentService: PaymentsService) { }

  ngOnInit(): void {
  }

  goToBillingPortalClicked(event: Event) {
    this.paymentService.openPortal().pipe(
      buttonLoadingSpinner(event)
    ).subscribe(result => {
      window.location.href = result
    })
  }

}
