import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs";
import { BASE_URL } from "src/app/environments/environments";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    path = BASE_URL

    constructor(private http: HttpClient) { } 

    openPricing(tier: string) {
        return this.http.post<string>(`${this.path}/stripe/create-checkout-session`, {
        }, {
            headers: AuthService.buildHeaders(['jwt']).headers,
            responseType: 'text' as any
        })
    }

    openPortal() {
        return this.http.post<string>(`${this.path}/stripe/create-portal-session`, {

        }, {
            headers: AuthService.buildHeaders(['jwt']).headers,
            responseType: 'text' as any
        })
    }

}