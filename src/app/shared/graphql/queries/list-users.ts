export const ListUsersQuery = `
    query ListUsers($projectId: UUID!, $filter: EventFilter) {
        listUsers(projectId: $projectId, filter: $filter) {
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
