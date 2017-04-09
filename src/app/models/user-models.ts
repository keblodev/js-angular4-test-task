export interface UserModel {
    id:         String
    stats:      UserStatsModel
    isLoggedIn: Boolean
    isActive:   Boolean
}

export interface UserStatsModel {
    totallMessagesCount: Number
    toProcessCount:      Number
    processedCount:      Number  
}
