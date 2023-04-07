export const MinTransactionsInPeriodQuery = `
    query MinTransactionsInPeriod($from: DateTime, $to: DateTime, $granularity: Duration, $projectId: UUID!, $filter: EventFilter) {
        minTransactionsInPeriod(from: $from, to: $to, granularity: $granularity, projectId: $projectId, filter: $filter)
    }
`
