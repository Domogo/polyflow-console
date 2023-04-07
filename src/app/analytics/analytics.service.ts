import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { ProjectService } from "../shared/project.service";
import { GQLClient } from "../shared/graphql/graphql-client";
import { TypeName } from "../shared/graphql/data-types";

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor(private projectSerivice: ProjectService,
        private gqlClient: GQLClient) { }

    getAllEvents() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.findEvents(
                {
                    projectId: project!.id
                }
            )),
            tap(events => {
                events.map(event => {
                    switch (event.__typename) { // example - unpacking event type
                        case TypeName.TxRequestEvent:
                            // event is of type TxRequest event... (smart cast)
                            break
                        case TypeName.ErrorEvent:
                            break
                        case TypeName.UserLandedEvent:
                            break
                        case TypeName.WalletConnectedEvent:
                            break
                    }
                })
            })
        )
    }

    getTotalConnectedWallets() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.totalConnectedWallets(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    getTotalTransactions() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.totalTransactions(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    newWalletsConnected() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.totalNewWallets(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    periodActiveWallets() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.periodActiveWallets(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    totalSuccessfulTransactions() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.totalSuccessfulTransactions(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    totalCancelledTransactions() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.totalCancelledTransactions(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    averageTransactionsPerUser() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.averageTransactionsPerUser(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    averageTransactions() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.averageTransactions(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    minTransactionsInPeriod() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.minTransactionsInPeriod(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    maxTransactionsInPeriod() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.maxTransactionsInPeriod(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    listWalletProviders() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.listWalletProviders(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    listBrowsers() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.listBrowsers(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    listCountries() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.listCountries(
                {
                    projectId: project!.id
                }
            ))
        )
    }

    analyticsOverview() {
        return this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.request(`
                query{
                    totalConnectedWallets(
                    projectId: "${project?.id}"
                    ) { from, to, value }
                    totalNewWallets(
                    projectId: "${project?.id}"
                    ) { from, to, value }
                    totalTransactions(
                    projectId: "${project?.id}",
                    ) { from, to, value }
                }
            `))
        )
    }
}

interface IntTimespanValues {
    from: string,
    to: string,
    value: number
}
