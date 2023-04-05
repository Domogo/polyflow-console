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
    VerifyComponent
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
