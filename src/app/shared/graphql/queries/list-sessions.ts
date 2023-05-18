export const ListSessionsQuery = `
    query ListSessions($projectId: UUID!, $filter: EventFilter, $pagination: Pagination) {
        listSessions(projectId: $projectId, filter: $filter, pagination: $pagination) {
            sessionId
            totalEventCount
            totalErrorEventCount
            walletAddresses
            firstEventDateTime
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
        }
    }
`
