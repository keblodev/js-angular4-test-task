import { Component } from '@angular/core';

export interface MessageModel {
    messageId:              string,
    isProcessed:            boolean,
    messageType:            string,
    recipientName:          string,              
    template:               string,
    associatedComponents?:  Array<Component>,
    messageTextCompiled?:   string
}

export interface MessageComponentConfiguration {
    componentType:  string,
    pattern:        string    
}