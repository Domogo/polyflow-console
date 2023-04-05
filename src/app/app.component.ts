import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations/fade.animation';
import { ModalService } from './shared/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'polyflow-console';

  modalContent$ = this.modalService.modal$

  constructor(private modalService: ModalService) {}


}
