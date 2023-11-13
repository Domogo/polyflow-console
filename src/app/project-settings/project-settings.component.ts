import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payment/payments.service';
import { buttonLoadingSpinner } from '../shared/operators/button-loading-spinner.operator';
import { ConfigService } from '../shared/config.service';
import { ModalService } from '../shared/modal/modal.service';
import { ProjectService } from '../shared/project.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css'],
})
export class ProjectSettingsComponent implements OnInit {
  project$ = this.projectService.currentProject$;

  constructor(
    private paymentService: PaymentsService,
    private projectService: ProjectService,
    private configService: ConfigService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        this.darkMode = true;
      } else {
        document.documentElement.classList.remove('dark');
        this.darkMode = false;
      }
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  darkMode = false;

  createAPIKey(event: Event) {
    this.configService
      .createAPIKey()
      .pipe(
        buttonLoadingSpinner(event),
        catchError((err) => this.modalService.displayError(err))
      )
      .subscribe();
  }

  deleteAPIKey(event: Event) {
    this.configService
      .deleteAPIKey()
      .pipe(
        buttonLoadingSpinner(event),
        catchError((err) => this.modalService.displayError(err))
      )
      .subscribe();
  }

  generatePasteScript(apiKey: string) {
    return `<script src='https://sdk.polyflow.dev/generate?api=${apiKey}' async></script>`;
  }

  goToBillingPortalClicked(event: Event) {
    this.paymentService
      .openPortal()
      .pipe(buttonLoadingSpinner(event))
      .subscribe((result) => {
        window.location.href = result;
      });
  }
}
