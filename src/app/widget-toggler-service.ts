import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetTogglerService {
  private isUpsellWidgetHidden = new BehaviorSubject(true);
  isUpsellWidgetHidden$ = this.isUpsellWidgetHidden.asObservable();

  private isProjectModalHidden = new BehaviorSubject(true);
  isProjectModalHidden$ = this.isProjectModalHidden.asObservable();

  private isUserModalHidden = new BehaviorSubject(true);
  isUserModalHidden$ = this.isUserModalHidden.asObservable();

  constructor() {}

  toggleUpsellModal() {
    this.isUpsellWidgetHidden.next(!this.isUpsellWidgetHidden.value);
  }

  toggleProjectModal() {
    this.isProjectModalHidden.next(!this.isProjectModalHidden.value);
  }

  toggleUserModal() {
    this.isUserModalHidden.next(!this.isUserModalHidden.value);
  }
}
