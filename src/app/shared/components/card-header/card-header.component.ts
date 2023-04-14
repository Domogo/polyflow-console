import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

  @Input() title: string = ''
  @Input() isCollapseVisible = true

  constructor() { }

  ngOnInit(): void {
  }

}
