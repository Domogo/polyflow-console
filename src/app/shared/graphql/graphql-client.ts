import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { AwesomeGraphQLClient, GraphQLRequestError } from 'awesome-graphql-client';
import { print } from 'graphql';
import { from, map, switchMap, tap } from 'rxjs';
import { AuthResponseModel, AuthService } from '../../auth/auth.service'
import { handleError } from '../error-handler/error';
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
                endpoint: 'https://dropd.dev/api/graphql',
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
}



