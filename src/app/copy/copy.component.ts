import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class CopyComponent implements OnInit {

  checkActive = false
  @Input() copyValue!: string

  constructor() { }

  ngOnInit(): void {
  }

  copyClicked() {
    this.checkActive = true
    navigator.clipboard.writeText(this.copyValue).then(_ => { })
    setTimeout(() => { this.checkActive = false }, 500)
  }

}
