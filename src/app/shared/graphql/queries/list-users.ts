export const ListUsersQuery = `
    query ListUsers($projectId: UUID!, $filter: EventFilter, $pagination: Pagination) {
        listUsers(projectId: $projectId, filter: $filter, pagination: $pagination) {
            userId
            sessionIds
            totalEventCount
            totalErrorEventCount
            walletAddresses
            hasConnectedWallet
            hasExecutedTransaction
            devices {
                os
                browser
                country
                screen {
                    w
                    h
                }
                walletProvider
            }
            firstEventDateTime
        }
    }
`
