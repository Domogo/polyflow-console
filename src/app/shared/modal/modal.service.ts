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
        title: 'Account not activated',
        message: 'To start your free trial or continue using the app, you must provide Polyflow with your payment details.',
        type: 'info',
        closeButtonText: 'Continue',
        action: () => {
          window.location.href = `https://polyflow.dev/pricing?existingUser=true`
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