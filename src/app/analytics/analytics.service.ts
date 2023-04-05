import { Injectable } from "@angular/core";
import { map, switchMap } from "rxjs";
import { ProjectService } from "../shared/project.service";
import { GQLClient } from "../shared/graphql/graphql-client";

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
            ))
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
            switchMap(project => this.gqlClient.request(`
                query{
                    totalTransactions(
                    projectId: "${project?.id}"
                    ) { from, to, value }
                }
            `)),
            map(result => result["totalTransactions"]),
            map(result => result as IntTimespanValues[])
        )
    }

    newWalletsConnected() {
        return  this.projectSerivice.currentProject$.pipe(
            switchMap(project => this.gqlClient.request(`
                query {
                    totalNewWallets(
                    projectId: "asd"
                    ) { from, to, value }
                }
            `)),
            map(result => result["totalNewWallets"]),
            map(result => result as IntTimespanValues[])
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
