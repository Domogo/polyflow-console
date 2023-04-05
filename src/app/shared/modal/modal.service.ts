import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalSub = new BehaviorSubject<ModalContent | null>(null)
  modal$ = this.modalSub.asObservable()

  constructor() { }

  openModal(content: ModalContent) {
    this.modalSub.next(content)
  }

  closeModal() {
    this.modalSub.next(null)
  }

  displayError(err: any) {
    this.modalSub.next({
      title: 'Error',
      message: err.error.message,
      type: 'error'
    })
    return of()
  }
}

interface ModalContent {
  title: string,
  message: string,
  type: ModalType
}

export type ModalType = 'error' | 'info' | 'success' 