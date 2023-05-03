import { Component, Input, OnInit } from '@angular/core';
import { fadeAnimation } from '../../animations/fade.animation';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class ModalComponent implements OnInit {

  @Input() title = ""
  @Input() message = ""
  @Input() type: 'error' | 'info' | 'success' = 'info'
  @Input() onAfterClose?: () => void
  @Input() closeButtonText?: string

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.onAfterClose?.()
    this.modalService.closeModal()
  }

}
