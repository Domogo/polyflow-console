import { environment } from "src/environments/environment"

export const BASE_URL = environment.production ? 
    // 'https://backend-prod.polyflow.dev/api/v1' :
    'https://backend-staging.polyflow.dev/api/graphql':
    'https://backend-staging.polyflow.dev/api/v1'

export const BASE_GQL_URL = environment.production ? 
    // 'https://backend-prod.polyflow.dev/api/graphql' :
    'https://backend-staging.polyflow.dev/api/graphql':
    'https://backend-staging.polyflow.dev/api/graphql'
