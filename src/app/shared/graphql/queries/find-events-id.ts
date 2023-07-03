export const FindEventByIdQuery = `
    query FindEventById($id: UUID!) {
        findEventById(id: $id) {
            __typename
            ... on WalletConnectedEvent {
                id
                projectId
                createdAt
                tracker {
                    eventTracker
                    userId
                    sessionId
                    utmSource
                    utmMedium
                    utmCampaign
                    utmContent
                    utmTerm
                    origin
                    path
                    referrer
                }
                walletConnectedWallet: wallet {
                    walletAddress
                    gasBalance
                    nonce
                    networkId
                }
                device {
                    os
                    browser
                    country
                    screen {
                        w
                        h
                    }
                    walletProvider
                }
                walletConnectedNetwork: network {
                    chainId
                    gasPrice
                    blockHeight
                }
            }
            ... on TxRequestEvent {
                id
                projectId
                createdAt
                tracker {
                    eventTracker
                    userId
                    sessionId
                    utmSource
                    utmMedium
                    utmCampaign
                    utmContent
                    utmTerm
                    origin
                    path
                    referrer
                }
                txRequestWallet: wallet {
                    walletAddress
                    gasBalance
                    nonce
                    networkId
                }
                device {
                    os
                    browser
                    country
                    screen {
                        w
                        h
                    }
                    walletProvider
                }
                txRequestNetwork: network {
                    chainId
                    gasPrice
                    blockHeight
                }
                tx {
                    from
                    to
                    value
                    input
                    nonce
                    gas
                    gasPrice
                    hash
                    status
                }
            }
            ... on UserLandedEvent {
                id
                projectId
                createdAt
                tracker {
                    eventTracker
                    userId
                    sessionId
                    utmSource
                    utmMedium
                    utmCampaign
                    utmContent
                    utmTerm
                    origin
                    path
                    referrer
                }
                userLandedWallet: wallet {
                    walletAddress
                    gasBalance
                    nonce
                    networkId
                }
                device {
                    os
                    browser
                    country
                    screen {
                        w
                        h
                    }
                    walletProvider
                }
                userLandedNetwork: network {
                    chainId
                    gasPrice
                    blockHeight
                }
            }
            ... on ErrorEvent {
                id
                id
                projectId
                createdAt
                tracker {
                    eventTracker
                    userId
                    sessionId
                    utmSource
                    utmMedium
                    utmCampaign
                    utmContent
                    utmTerm
                    origin
                    path
                    referrer
                }
                errorEventWallet: wallet {
                    walletAddress
                    gasBalance
                    nonce
                    networkId
                }
                device {
                    os
                    browser
                    country
                    screen {
                        w
                        h
                    }
                    walletProvider
                }
                errorEventNetwork: network {
                    chainId
                    gasPrice
                    blockHeight
                }
                errors
            }
        }
    }
`
