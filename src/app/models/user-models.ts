export interface User {
    id:         String
    stats:      UserStats
    isLoggedIn: Boolean
    isActive:   Boolean
}

export interface UserStats {
    totallMessagesCount: Number
    toProcessCount:      Number
    processedCount:      Number  
}

//todo: add list of UserStats
