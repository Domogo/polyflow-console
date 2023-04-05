import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FadeInOut } from '../animations/FadeAnimation';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { WidgetTogglerService } from '../widget-toggler-service';

@Component({
  selector: 'app-upsell-modal',
  templateUrl: './upsell-modal.component.html',
  styleUrls: ['./upsell-modal.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class UpsellModalComponent implements OnInit {

  isHidden$ = this.widgetTogglerService.isUpsellWidgetHidden$

  constructor(private widgetTogglerService: WidgetTogglerService) { }

  ngOnInit(): void {
  }

  toggleModal() {
    this.widgetTogglerService.toggleUpsellModal()
  }

}
