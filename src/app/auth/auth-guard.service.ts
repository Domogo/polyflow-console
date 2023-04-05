// src/app/auth/auth-guard.service.tsimport { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> {
        return this.authService.isLoggedIn$.pipe(
            tap(isLoggedIn => {
                if(!isLoggedIn) { this.redirect() }
            })
        )
    }

    private redirect() {
        this.router.navigate(['/'])
    }
}