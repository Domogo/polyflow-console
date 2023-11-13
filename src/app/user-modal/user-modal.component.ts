import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../shared/animations/fade.animation';
import { WidgetTogglerService } from '../widget-toggler-service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  animations: [fadeAnimation],
})
export class UserModalComponent implements OnInit {
  isHidden$ = this.widgetTogglerService.isUserModalHidden$;

  constructor(
    private widgetTogglerService: WidgetTogglerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
  }

  toggleModal() {
    this.widgetTogglerService.toggleUserModal();
  }
}
