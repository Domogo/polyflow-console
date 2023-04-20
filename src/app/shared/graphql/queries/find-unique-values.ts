export const FindUniqueValuesQuery = `
    query FindUniqueValuesQuery($eventTrackerFields: EventTrackerModelField, $deviceStateFields: DeviceStateField, $projectId: UUID, $from: DateTime!, $to: DateTime, $filter: EventFilter) {
        averageTransactionsPerUser(eventTrackerFields: $eventTrackerFields, deviceStateFields: $deviceStateFields, projectId: $projctId, from: $from, to: $to, filter: $filter) {
            from
            to
            averageValue
        }
    }
`
