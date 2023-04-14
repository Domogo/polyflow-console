export const ListSessionsQuery = `
    query ListSessions($projectId: UUID!, $filter: EventFilter) {
        listSessions(projectId: $projectId, filter: $filter) {
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
