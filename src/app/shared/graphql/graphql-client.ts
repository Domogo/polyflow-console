import { Injectable } from '@angular/core';
import { AwesomeGraphQLClient } from 'awesome-graphql-client';
import { Observable, from, map, switchMap, tap, of, throwError } from 'rxjs';
import { AuthResponseModel, AuthService } from '../../auth/auth.service'
import { handleError } from '../error-handler/error';
import { BASE_GQL_URL } from 'src/app/environments/environments';
import { AverageTimespanValues, Event, FindEventsQueryResult, ProjectUserStats, FindEventsQueryVars, IntTimespanValues, PeriodActiveWalletsQueryResult, TotalConnectedWalletsQueryResult, TotalNewWalletsQueryResult, TotalTransactionsQueryResult, TotalSuccessfulTransactionsQueryResult, TotalCancelledTransactionsQueryResult, AverageTimespanValue, AverageTransactionsPerUserQueryResult, MovingAverageTimespanValues, AverageTransactionsQueryResult, MinTransactionsInPeriodQueryResult, MaxTransactionsInPeriodQueryResult, WalletConnectionsAndTransactionsInfo, ListWalletProvidersQueryResult, ListBrowsersQueryResult, ListCountriesQueryResult, TimePeriodVars, EventFilterVars, ListSessionsQueryResult, SessionsEventInfo, ProjectUserStatsQueryResult } from './data-types';
import { FindEventsQuery } from './queries/find-events';
import { TotalConnectedWalletsQuery } from './queries/total-connected-wallets';
import { TotalNewWalletsQuery } from './queries/total-new-wallets';
import { PeriodActiveWalletsQuery } from './queries/period-active-wallets';
import { TotalTransactionsQuery } from './queries/total-transactions';
import { TotalSuccessfulTransactionsQuery } from './queries/total-successful-transactions';
import { TotalCancelledTransactionsQuery } from './queries/total-cancelled-transactions';
import { AverageTransactionsPerUserQuery } from './queries/average-transactions-per-user';
import { AverageTransactionsQuery } from './queries/average-transactions';
import { MinTransactionsInPeriodQuery } from './queries/min-transactions-in-period';
import { MaxTransactionsInPeriodQuery } from './queries/max-transactions-in-period';
import { ListBrowsersQuery } from './queries/list-browsers';
import { ListWalletProvidersQuery } from './queries/list-wallet-providers';
import { ListCountriesQuery } from './queries/list-countries';
import { ListSessionsQuery } from './queries/list-sessions';
import { ProjectUserStatsQuery } from './queries/project-user-stats'

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
            switchMap(client => client.requestSafe<FindEventsQueryResult, FindEventsQueryVars>(FindEventsQuery, vars)),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.findEvents)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    totalConnectedWallets(
        vars: TimePeriodVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<TotalConnectedWalletsQueryResult, TimePeriodVars>(
                    TotalConnectedWalletsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    console.log(response.data);
                    return of(response.data.totalConnectedWallets)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    totalNewWallets(
        vars: TimePeriodVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<TotalNewWalletsQueryResult, TimePeriodVars>(
                    TotalNewWalletsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.totalNewWallets)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    periodActiveWallets(
        vars: TimePeriodVars
    ): Observable<AverageTimespanValues> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<PeriodActiveWalletsQueryResult, TimePeriodVars>(
                    PeriodActiveWalletsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.periodActiveWallets)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    totalTransactions(
        vars: TimePeriodVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<TotalTransactionsQueryResult, TimePeriodVars>(
                    TotalTransactionsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.totalTransactions)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    totalSuccessfulTransactions(
        vars: TimePeriodVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<TotalSuccessfulTransactionsQueryResult, TimePeriodVars>(
                    TotalSuccessfulTransactionsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.totalSuccessfulTransactions)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    totalCancelledTransactions(
        vars: TimePeriodVars
    ): Observable<IntTimespanValues[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<TotalCancelledTransactionsQueryResult, TimePeriodVars>(
                    TotalCancelledTransactionsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.totalCancelledTransactions)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    averageTransactionsPerUser(
        vars: TimePeriodVars
    ): Observable<AverageTimespanValue[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<AverageTransactionsPerUserQueryResult, TimePeriodVars>(
                    AverageTransactionsPerUserQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.averageTransactionsPerUser)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    averageTransactions(
        vars: TimePeriodVars
    ): Observable<MovingAverageTimespanValues> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<AverageTransactionsQueryResult, TimePeriodVars>(
                    AverageTransactionsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.averageTransactions)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    minTransactionsInPeriod(
        vars: TimePeriodVars
    ): Observable<number> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<MinTransactionsInPeriodQueryResult, TimePeriodVars>(
                    MinTransactionsInPeriodQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.minTransactionsInPeriod)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    maxTransactionsInPeriod(
        vars: TimePeriodVars
    ): Observable<number> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<MaxTransactionsInPeriodQueryResult, TimePeriodVars>(
                    MaxTransactionsInPeriodQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.maxTransactionsInPeriod)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }
    
    listWalletProviders(
        vars: EventFilterVars
    ): Observable<WalletConnectionsAndTransactionsInfo[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<ListWalletProvidersQueryResult, EventFilterVars>(
                    ListWalletProvidersQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.listWalletProviders)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    listBrowsers(
        vars: EventFilterVars
    ): Observable<WalletConnectionsAndTransactionsInfo[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<ListBrowsersQueryResult, EventFilterVars>(
                    ListBrowsersQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.listBrowsers)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    listCountries(
        vars: EventFilterVars
    ): Observable<WalletConnectionsAndTransactionsInfo[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<ListCountriesQueryResult, EventFilterVars>(
                    ListCountriesQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.listCountries)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    listSessions(
        vars: EventFilterVars
    ): Observable<SessionsEventInfo[]> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<ListSessionsQueryResult, EventFilterVars>(
                    ListSessionsQuery, vars
                )
            ),
            switchMap(response => {
                if (response.ok) {
                    return of(response.data.listSessions)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }

    getProjectUserStats(
        vars: EventFilterVars
    ): Observable<ProjectUserStats> {
        return this._gqlClient$.pipe(
            switchMap(client => 
                client.requestSafe<ProjectUserStatsQueryResult, EventFilterVars>(
                    ProjectUserStatsQuery, vars
                )
            ),
            switchMap(response => {
                if(response.ok) {
                    return of(response.data.projectUserStats)
                } else {
                    return throwError(() => response.error)
                }
            })
        )
    }
}
