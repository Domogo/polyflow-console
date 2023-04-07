export const AverageTransactionsPerUserQuery = `
    query AverageTransactionsPerUser($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        averageTransactionsPerUser(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter) {
            from
            to
            averageValue
        }
    }
`
