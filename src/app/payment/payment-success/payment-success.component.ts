import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private paymentService: PaymentsService) { }

  ngOnInit(): void {

    this.paymentService.openPortal().subscribe(res => {
      window.location.href = res
    })

  }

}
