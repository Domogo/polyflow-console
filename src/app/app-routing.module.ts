import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcquisitionComponent } from './acquisition/acquisition.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ComponentsConfigComponent } from './components-config/components-config.component';
import { ConfigComponent } from './config/config.component';
import { ConsoleHolderComponent } from './console-holder/console-holder.component';
import { ErrorLoggerDetailsComponent } from './error-logger/error-logger-details/error-logger-details.component';
import { ErrorLoggerComponent } from './error-logger/error-logger.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const consoleRoutes: Routes = [
  { path: 'uicomponents', component: ComponentsConfigComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'errorlogs', component: ErrorLoggerComponent },
  { path: 'errorlogs/:id', component: ErrorLoggerDetailsComponent },
  { path: 'config', component: ConfigComponent},
  { path: 'acquisition', component: AcquisitionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: AuthComponent },
    {path: 'verify', component: VerifyComponent},
    { path: 'console/:projectID', component: ConsoleHolderComponent, children: consoleRoutes, canActivate: [AuthGuardService] },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
