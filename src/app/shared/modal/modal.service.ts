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
    console.log(err)
    if(err.error.errorCode === 'NO_ACTIVE_SUBSCRIPTION') {
      this.modalSub.next({
        title: 'No active subscription',
        message: 'You must buy a subscription or start a free trial!',
        type: 'info',
        closeButtonText: 'Open Pricing',
        action: () => {
          window.location.href = 'https://polyflow.dev/pricing'
        }
      })
      return of()
    }
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
  type: ModalType,
  closeButtonText?: string,
  action?: () => void
}

export type ModalType = 'error' | 'info' | 'success' 