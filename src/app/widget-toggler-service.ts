import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetTogglerService {

  private isUpsellWidgetHidden = new BehaviorSubject(true)
  isUpsellWidgetHidden$ = this.isUpsellWidgetHidden.asObservable()

  private isProjectModalHidden = new BehaviorSubject(true)
  isProjectModalHidden$ = this.isProjectModalHidden.asObservable()

  constructor() { }

  toggleUpsellModal() {
    this.isUpsellWidgetHidden.next(!this.isUpsellWidgetHidden.value)
  }

  toggleProjectModal() {
    this.isProjectModalHidden.next(!this.isProjectModalHidden.value)
  }
  
}
