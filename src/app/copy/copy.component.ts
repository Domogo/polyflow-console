import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class CopyComponent implements OnInit {

  checkActive = false

  constructor() { }

  ngOnInit(): void {
  }

  copyClicked() {
    this.checkActive = true
    setTimeout(() => { this.checkActive = false }, 500)
  }

}
