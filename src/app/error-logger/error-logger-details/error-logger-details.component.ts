import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-error-logger-details',
  templateUrl: './error-logger-details.component.html',
  styleUrls: ['./error-logger-details.component.css']
})
export class ErrorLoggerDetailsComponent implements OnInit {

  errorSub = new BehaviorSubject("")
  error$ = this.errorSub.asObservable()

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/sample-error.txt', { responseType: 'text' })
      .subscribe(data => {
        this.errorSub.next(data)
      })
  }

}
