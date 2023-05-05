import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import { BASE_URL } from "src/app/environments/environments";
import { AuthResponseModel, AuthService } from '../auth.service'

@Injectable({
    providedIn: 'root'
})
export class VerifyService {

    path = BASE_URL

    constructor(private http: HttpClient, private authService: AuthService) { } 

    verifyEmail(token: string) {
        return this.http.post<AuthResponseModel>(`${this.path}/register/verify`, {
            token: token
        }).pipe(
            tap(res => {
                this.authService.setUser(res as AuthResponseModel)
            })
        )
    }

    resendEmail(email: string) {
        return this.http.post(`${this.path}/register/resend`, {
            email: email
        })
    }

    openPricing(tier: string) {
        return this.http.post<string>(`${this.path}/stripe/create-checkout-session?price_id=${tier}`, {
        }, {
            headers: AuthService.buildHeaders(['jwt']).headers,
            responseType: 'text' as any
        })
    }

}