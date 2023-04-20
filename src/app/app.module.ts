import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConsoleHolderComponent } from './console-holder/console-holder.component';
import { AuthComponent } from './auth/auth.component';
import { CopyComponent } from './copy/copy.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ErrorLoggerComponent } from './error-logger/error-logger.component';
import { MetricsComponent } from './analytics/metrics/metrics.component';
import { ComponentsConfigComponent } from './components-config/components-config.component';
import { TxhistoryComponent } from './analytics/txhistory/txhistory.component';
import { UpsellModalComponent } from './upsell-modal/upsell-modal.component';
import { ErrorLoggerDetailsComponent } from './error-logger/error-logger-details/error-logger-details.component';
import { ConfigComponent } from './config/config.component';
import { ProjectSwitcherComponent } from './project-switcher/project-switcher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortenPipe } from './shorten.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal/modal.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { WithStatusPipe } from './shared/pipes/with-status.pipe';
import { AcquisitionComponent } from './acquisition/acquisition.component';
import { GridJsAngularModule } from 'gridjs-angular';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { CardHeaderComponent } from './shared/components/card-header/card-header.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ThankYouScreenComponent } from './thank-you-screen/thank-you-screen.component';
import { TxDetailsComponent } from './analytics/txhistory/tx-details/tx-details.component';
import { ErrorEventDetailsComponent } from './event-details/error-event-details/error-event-details.component';
import { IconItemHolderComponent } from './shared/components/icon-item-holder/icon-item-holder.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { EventErrorMessageHolderComponent } from './event-details/event-error-message-holder/event-error-message-holder.component';
import { DropdownSelectorComponent } from './shared/components/dropdown-selector/dropdown-selector.component';
import { EventsListComponent } from './shared/components/events-list/events-list.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ConsoleHolderComponent,
    AuthComponent,
    CopyComponent,
    AnalyticsComponent,
    ErrorLoggerComponent,
    MetricsComponent,
    ComponentsConfigComponent,
    TxhistoryComponent,
    UpsellModalComponent,
    ErrorLoggerDetailsComponent,
    ConfigComponent,
    ProjectSwitcherComponent,
    ShortenPipe,
    WithStatusPipe,
    ModalComponent,
    AcquisitionComponent,
    FiltersComponent,
    CardHeaderComponent,
    VerifyComponent,
    ThankYouScreenComponent,
    TxDetailsComponent,
    ErrorEventDetailsComponent,
    IconItemHolderComponent,
    SpinnerComponent,
    ProjectSettingsComponent,
    EventDetailsComponent,
    BackButtonComponent,
    EventErrorMessageHolderComponent,
    DropdownSelectorComponent,
    EventsListComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GridJsAngularModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
