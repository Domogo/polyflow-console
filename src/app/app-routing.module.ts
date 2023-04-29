import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcquisitionComponent } from './acquisition/acquisition.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TxDetailsComponent } from './analytics/txhistory/tx-details/tx-details.component';
import { TxhistoryComponent } from './analytics/txhistory/txhistory.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ComponentsConfigComponent } from './components-config/components-config.component';
import { ConfigComponent } from './config/config.component';
import { ConsoleHolderComponent } from './console-holder/console-holder.component';
import { ErrorLoggerDetailsComponent } from './error-logger/error-logger-details/error-logger-details.component';
import { ErrorLoggerComponent } from './error-logger/error-logger.component';
import { ErrorEventDetailsComponent } from './event-details/error-event-details/error-event-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ProjectSettingsComponent } from './project-settings/project-settings.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const consoleRoutes: Routes = [
  { path: 'uicomponents', component: ComponentsConfigComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'txhistory', component: TxhistoryComponent },
  { path: 'tx-details', component: TxDetailsComponent},
  { path: 'sessions', component: ErrorLoggerComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailsComponent},
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'sessions/:id', component: ErrorLoggerDetailsComponent },
  { path: 'config', component: ConfigComponent},
  { path: 'acquisition', component: AcquisitionComponent },
  { path: 'project-settings', component: ProjectSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: AuthComponent },
    {path: 'verify', component: VerifyComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'console', component: ConsoleHolderComponent, children: consoleRoutes, canActivate: [AuthGuardService] },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
