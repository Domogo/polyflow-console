import { Injectable } from '@angular/core';
import { AwesomeGraphQLClient, GraphQLRequestError } from 'awesome-graphql-client';
import { Observable, from, map, switchMap, tap, of, throwError } from 'rxjs';
import { AuthResponseModel, AuthService } from '../../auth/auth.service'
import { handleError } from '../error-handler/error';
import { BASE_GQL_URL } from 'src/app/environments/environments';
import { Event, FindEventsQueryVars, IntTimespanValues, TotalConnectedWalletsQueryVars } from './data-types';
import { FindEventsQuery } from './queries/find-events';
import { TotalConnectedWalletsQuery } from './queries/total-connected-wallets';

type GQLResponse<T> = GQLSuccessResponse<T> | GQLErrorResponse

interface GQLSuccessResponse<T> {
    ok: true,
    data: T
}

interface GQLErrorResponse {
    ok: false,
    error: Error | GraphQLRequestError<Response>
}

@Injectable({
    providedIn: 'root'
})
export class GQLClient {
    constructor(private authService: AuthService) { }

    private _gqlClient$ = this.authService.apiToken$.pipe(
        map(apiToken => {
            const storedUser = localStorage.getItem(AuthService.USER_STORAGE_ID)
            if(!storedUser) { throw "Not logged in" }
         
            const authHeader = 'Bearer ' + (JSON.parse(storedUser) as AuthResponseModel).token
          
            return new AwesomeGraphQLClient({
                endpoint: BASE_GQL_URL,
                fetchOptions: {
                  headers: {
                    'X-API-KEY': apiToken,
                    'Authorization': authHeader
                  }
                },
                onError(error) { handleError(error) }
            });
        })
    )  

    request(query: string) {
        return this._gqlClient$.pipe(
            switchMap(client => {
                return from(client.request(query))
            })
        )
    }

    findEvents(
        vars: FindEventsQueryVars
    ): Observable<Event[]> {
        return this._gqlClient$.pipe(
            switchMap(client => client.requestSafe<Event[], FindEventsQueryVars>(FindEventsQuery, vars)),
            switchMap(this.handleResponse)
        )
    }

    totalConnectedWallets(
        vars: TotalConnectedWalletsQueryVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<IntTimespanValues[], TotalConnectedWalletsQueryVars>(TotalConnectedWalletsQuery, vars)
            ),
            switchMap(this.handleResponse)
        )
    }

    private handleResponse<T>(response: GQLResponse<T>): Observable<T> {
        if (response.ok) {
            return of(response.data)
        } else {
            return throwError(() => response.error)
        }
    }
}
