import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, tap } from 'rxjs';
import { BASE_URL } from '../environments/environments';
import { ModalService } from '../shared/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static USER_STORAGE_ID = 'PF_USER'

  path = BASE_URL

  private userSub = new BehaviorSubject<AuthResponseModel | null>(
    this.initUserSub()
  )
  user$ = this.userSub.asObservable()

  apiToken$ = this.user$.pipe(map(user => user?.token))

  private set _user(user: AuthResponseModel | null) {
    localStorage.setItem(AuthService.USER_STORAGE_ID, JSON.stringify(user))
    this.userSub.next(user)
  }

  private get _user() {
    const storedValue = localStorage.getItem(AuthService.USER_STORAGE_ID)
    if(storedValue) {
      return JSON.parse(storedValue) as AuthResponseModel
    }
    return null
  }

  setUser(user: AuthResponseModel) {
    this._user = user
  }

  isLoggedIn$ = this.apiToken$.pipe(map(token => token !== null))


  constructor(private http: HttpClient, 
    private modalService: ModalService) { }

  signUp(email: string, password: string): Observable<AuthResponseModel | null> {
    return this.http.post<AuthResponseModel>(`${this.path}/register`, {
      email: email,
      password: password
    }).pipe(
      tap(authResponse => {
        this._user = authResponse
      })
    )
  }

  logOut() {
    this._user = null
  }

  logIn(email: string, password: string): Observable<AuthResponseModel | null> {
    return this.http.post<AuthResponseModel>(`${this.path}/login`, {
      email: email,
      password: password
    }).pipe(
      tap(authResponse => {
        this._user = authResponse
      })
    )
  }

  createStripeSession() {

  }

  static buildHeaders(options: HeaderOption[]) {
    const storedUser = localStorage.getItem(AuthService.USER_STORAGE_ID)
    if(!storedUser) { throw "Not logged in" }
    return {
      headers: {
        'Authorization': 'Bearer ' + (JSON.parse(storedUser) as AuthResponseModel).token
      }
    }
  }

  private initUserSub(): AuthResponseModel | null {
    const storedValue = localStorage.getItem(AuthService.USER_STORAGE_ID)
    if(storedValue) { return (JSON.parse(storedValue) as AuthResponseModel) }
    return null
  }


}

export interface AuthResponseModel {
  token: string,
  validUntil: string
  email: string
}

export type HeaderOption = 'jwt'