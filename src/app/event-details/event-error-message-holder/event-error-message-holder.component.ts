import { Component, Input, OnInit } from '@angular/core';
import { ErrorEvent } from 'src/app/shared/graphql/data-types';

@Component({
  selector: 'app-event-error-message-holder',
  templateUrl: './event-error-message-holder.component.html',
  styleUrls: ['./event-error-message-holder.component.css']
})
export class EventErrorMessageHolderComponent implements OnInit {

  @Input() event!: ErrorEvent

  isDetailsHidden = true

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetails() {
    this.isDetailsHidden = !this.isDetailsHidden
  }
}
