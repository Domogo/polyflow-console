import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BASE_URL } from "src/app/environments/environments";
import { AuthService } from '../auth.service'

@Injectable({
    providedIn: 'root'
})
export class VerifyService {

    path = BASE_URL

    constructor(private http: HttpClient) { } 

    verifyEmail(token: string) {
        return this.http.post(`${this.path}/register/verify`, {
            token: token
        })
    }

    resendEmail(email: string) {
        return this.http.post(`${this.path}/register/resend`, {
            email: email
        })
    }

}