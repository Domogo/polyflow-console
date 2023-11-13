import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent implements OnInit {
  @Input() screenName = '';
  @Input() secondScreenName = '';
  @Input() thirdScreenName = '';
  @Input() color = 'black';
  @Input() secondColor = 'black';
  @Input() darkColor = 'black';

  constructor(private location: Location) {}

  ngOnInit(): void {}

  backClicked() {
    this.location.back();
  }
}
