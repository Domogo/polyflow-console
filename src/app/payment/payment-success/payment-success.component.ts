import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private paymentService: PaymentsService, 
    private modalService: ModalService, 
    private router: Router) { }

  ngOnInit(): void {

    this.paymentService.openPortal().pipe(
      catchError(err => this.modalService.displayError(err))
    ).subscribe(res => {
      this.router.navigate(['/'])
    })

  }

}
