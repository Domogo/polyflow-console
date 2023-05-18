export enum EventTracker {
    WALLET_CONNECT = "WALLET_CONNECT",
    USER_LANDED = "USER_LANDED",
    TX_REQUEST = "TX_REQUEST",
    GENERIC_ERROR = "GENERIC_ERROR"
}

export enum TypeName {
    "WalletConnectedEvent",
    "TxRequestEvent",
    "ErrorEvent",
    "UserLandedEvent"
}

export interface EventTrackerModelFilter {
    eventTracker?: EventTracker,
    userId?: string,
    sessionId?: string,
    utmSource?: string,
    utmMedium?: string,
    utmCampaign?: string,
    utmContent?: string,
    utmTerm?: string,
    origin?: string,
    path?: string
}

export interface WalletStateFilter {
    walletAddress?: string
    networkId?: string
}

export interface DeviceStateFilter {
    os?: string,
    browser?: string,
    country?: string,
    walletProvider?: string
}

export interface NetworkStateFilter {
    chainId?: number,
    blockHeight?: string
}

export interface EventFilter {
    tracker?: EventTrackerModelFilter,
    wallet?: WalletStateFilter,
    device?: DeviceStateFilter,
    network?: NetworkStateFilter
}

export interface EventTrackerModel {
    eventTracker: EventTracker,
    userId: string,
    sessionId: string,
    utmSource?: string,
    utmMedium?: string,
    utmCampaign?: string,
    utmContent?: string,
    utmTerm?: string,
    origin?: string,
    path?: string
}

export interface WalletState {
    walletAddress: string,
    gasBalance: string,
    nonce: string,
    networkId: number
}

export interface ScreenState {
    w: number,
    h: number
}

export interface DeviceState {
    os?: string,
    browser?: string,
    country?: string,
    screen?: ScreenState,
    walletProvider: string,
}

export interface NetworkState {
    chainId: number,
    gasPrice: string,
    blockHeight: string
}

export interface TxData {
    from: string,
    to?: string,
    value?: string,
    input?: string,
    nonce: string,
    gas: string,
    gasPrice: string,
    maxFeePerGas?: string,
    maxPriorityFeePerGas?: string,
    v?: string,
    r?: string,
    s?: string,
    hash?: string,
    status: TxStatus
}

export enum TxStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILURE = "FAILURE"
}

export interface WalletConnectedEvent {
    __typename: TypeName.WalletConnectedEvent,
    id: string,
    projectId: string,
    createdAt: string,
    tracker: EventTrackerModel,
    walletConnectedWallet: WalletState,
    device: DeviceState,
    walletConnectedNetwork: NetworkState
}
export interface TxRequestEvent {
    __typename: TypeName.TxRequestEvent,
    id: string,
    projectId: string,
    createdAt: string,
    tracker: EventTrackerModel,
    txRequestWallet: WalletState,
    device: DeviceState,
    txRequestNetwork: NetworkState,
    tx: TxData
}
export interface ErrorEvent {
    __typename: TypeName.ErrorEvent,
    projectId: string,
    id: string,
    createdAt: string,
    tracker: EventTrackerModel,
    errorEventWallet?: WalletState,
    device: DeviceState,
    errorEventNetwork?: NetworkState,
    errors: string[]
}
export interface UserLandedEvent {
    __typename: TypeName.UserLandedEvent,
    projectId: string,
    id: string,
    createdAt: string,
    tracker: EventTrackerModel,
    userLandedWallet?: WalletState,
    device: DeviceState,
    userLandedNetwork?: NetworkState
}

export type Event = WalletConnectedEvent | TxRequestEvent | ErrorEvent | UserLandedEvent

export interface IntTimespanValues {
    from: string,
    to: string,
    value: number
}

export interface AverageTimespanValue {
    from: string,
    to: string,
    averageValue: number
}

export interface AverageTimespanValues {
    averageValue: number,
    values: IntTimespanValues[]
}

export interface MovingAverageTimespanValues {
    averageValue: number,
    movingAverages: [AverageTimespanValue]
}

export interface WalletConnectionsAndTransactionsInfo {
    name: string,
    totalWalletConnections: number,
    uniqueWalletConnections: number,
    executedTransactions: number
}

/** QUERY VARS */

export interface TimePeriodVars {
    from?: string,
    to?: string,
    granularity?: string,
    projectId: string,
    filter?: EventFilter
    pagination?: Pagination
}

export interface EventFilterVars {
    projectId: string,
    filter?: EventFilter
    pagination?: Pagination
}

export interface StatsVars {
    field: EventTrackerModelField,
    projectId: string,
    from?: string,
    to?: string,
    filter?: EventFilter
    pagination?: Pagination
}

export enum EventTrackerModelField {
    EVENT_TRACKER = "EVENT_TRACKER",
    SESSION_ID = "SESSION_ID",
    UTM_SOURCE = "UTM_SOURCE",
    UTM_MEDIUM = "UTM_MEDIUM",
    UTM_CAMPAIGN = "UTM_CAMPAIGN",
    UTM_CONTENT = "UTM_CONTENT",
    UTM_TERM = "UTM_TERM",
    ORIGIN = "ORIGIN",
    PATH = "PATH"
}

export interface FindEventsQueryVars {
    from?: string,
    to?: string,
    projectId: string,
    filter?: EventFilter,
    pagination?: Pagination
}

export interface FindEventsByIdQueryVars {
    id: string
}

export interface FindEventsQueryResult {
    findEvents: Event[]
}

export interface FindEventsByIdQueryResult {
    findEventById: Event
}

export interface TotalConnectedWalletsQueryResult {
    totalConnectedWallets: IntTimespanValues[]
}

export interface TotalNewWalletsQueryResult {
    totalNewWallets: IntTimespanValues[]
}

export interface PeriodActiveWalletsQueryResult {
    periodActiveWallets: AverageTimespanValues
}

export interface TotalTransactionsQueryResult {
    totalTransactions: IntTimespanValues[]
}

export interface TotalSuccessfulTransactionsQueryResult {
    totalSuccessfulTransactions: IntTimespanValues[]
}

export interface TotalCancelledTransactionsQueryResult {
    totalCancelledTransactions: IntTimespanValues[]
}

export interface AverageTransactionsPerUserQueryResult {
    averageTransactionsPerUser: AverageTimespanValue[]
}

export interface AverageTransactionsQueryResult {
    averageTransactions: MovingAverageTimespanValues
}

export interface MinTransactionsInPeriodQueryResult {
    minTransactionsInPeriod: number
}

export interface MaxTransactionsInPeriodQueryResult {
    maxTransactionsInPeriod: number
}

export interface ListWalletProvidersQueryResult {
    listWalletProviders: WalletConnectionsAndTransactionsInfo[]
}

export interface ListBrowsersQueryResult {
    listBrowsers: WalletConnectionsAndTransactionsInfo[]
}

export interface ListCountriesQueryResult {
    listCountries: WalletConnectionsAndTransactionsInfo[]
}

export interface ListSessionsQueryResult {
    listSessions: SessionsEventInfo[]
}

export interface ListUsersQueryResult {
    listUsers: UserEventsInfo[]
}

export interface GetUserWalletAndTransactionStatsQueryResult {
    getUserWalletAndTransactionStats: UsersWalletAndTransactionsInfo[]
}

export interface Pagination {
    limit: number,
    offset: number
}


export interface UsersWalletAndTransactionsInfo {
    name: string,
    totalUsers: number,
    usersWithWallet: number,
    usersWithConnectedWallet: number,
    totalWalletConnections: number,
    uniqueWalletConnections: number,
    executedTransactions: number,
    usersWithExecutedTx: number
}

export interface UserEventsInfo {
    userId: string,
    sessionIds: string[],
    totalEventCount: number,
    totalErrorEventCount: number,
    walletAddresses: string[],
    hasConnectedWallet: boolean,
    hasExecutedTransaction: boolean,
    devices: DeviceState[],
    firstEventDateTime: string
}

export interface SessionsEventInfo {
    sessionId: string
    totalEventCount: string,
    totalErrorEventCount: number,
    walletAddresses: string[]
    hasConnectedWallet: boolean
    hasExecutedTransaction: string,
    devices: DeviceState[]
    firstEventDateTime: string
}

export interface ProjectUserStatsQueryResult {
    projectUserStats: ProjectUserStats
}

export interface ProjectUserStats {
    totalUsers: number
    usersWithWallet: number
    usersWithConnectedWallet: number
    usersWithExecutedTx: number
    usersWithMultipleExecutedTx: number
}