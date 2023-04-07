export const MaxTransactionsInPeriodQuery = `
    query MaxTransactionsInPeriod($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        maxTransactionsInPeriod(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter)
    }
`
