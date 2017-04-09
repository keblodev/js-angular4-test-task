import { Component, Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

import { UserStatsModel } from '../models/user-models';
import { MessageModel, MessageComponentConfiguration } from '../models/message-models';

import { MessageConfiguratorTypes } from '../statics/message-types';

@Injectable()
export class RemoteStateService {

  get UserQueRemoteStats(): Observable<UserStatsModel> {
    return this.userQueRemoteStats;
  }

  get MessageQue(): Observable<Array<MessageModel>> {
    return this.messageQue;
  }  

  get MessageGifts(): Observable<any> {
    return this.messageGifts;
  }

  get MessageNames(): Observable<any> {
    return this.messageNames;
  }  

  get IsUserLoggedIn(): Observable<any> {
    return this.apiService.auth().map((response:any) => {
          return response.isLoggedIn;
      });
  }

  private userQueRemoteStats: BehaviorSubject<any>
  private messageQue:         BehaviorSubject<any>
  private messageGifts:       BehaviorSubject<any>
  private messageNames:       BehaviorSubject<any>

  private isLoggedIn:         BehaviorSubject<any>

  private permSubscriptions:      Subscription[] = []
  private dynamicSubscriptions:   Subscription[] = []

  constructor(private apiService: ApiService) {
    this.userQueRemoteStats =   new BehaviorSubject<any>(false);
    this.messageQue         =   new BehaviorSubject<any>(false);    
    this.messageGifts       =   new BehaviorSubject<any>(false);
    this.messageNames       =   new BehaviorSubject<any>(false);

    this.isLoggedIn         =   new BehaviorSubject<any>(false);
  }  

  private evaluatePermSubs() {
    this.permSubscriptions.push(
      //getting standard and special gifts as a single collection here
      Observable.forkJoin(
        this.apiService.getGifts(),
        this.apiService.getSpecialGifts())
        .subscribe( (giftsCollection: Array<Array<any>>) => {
          const combinedGiftsCollection = giftsCollection.reduce((current, next) => current.concat(next), [])
          this.messageGifts.next(combinedGiftsCollection);
        }),
      this.apiService.getNamesList()
        .subscribe( namesCollection => {
          this.messageNames.next(namesCollection);
        })
    )
  }

  private evaluateDynamicSubs() {
      this.dynamicSubscriptions.forEach(s => s.unsubscribe);
      this.dynamicSubscriptions.push(
        this.apiService.getUserStats()
          .subscribe( nextVal => this.userQueRemoteStats.next(nextVal)),
        this.apiService.getNextMessageCollection()
          .subscribe( (nextVal: Array<MessageModel>) => {
            const enrichedConllection = nextVal.map( message => {
              message.associatedComponents = this.getMessageConfigiratoComponents(message);
              return message;
            })          
            this.messageQue.next(enrichedConllection);
          })
      )
  }

  evaluateWorkspaceInfo() {
    this.evaluatePermSubs();
    this.evaluateDynamicSubs();
  }

  loginUser(userCredentials: any): Observable<any> {
    return this.apiService.login(userCredentials);
  }

  logoutUser() {
    return this.apiService.logout();
  }

  resetDemo() {
    return this.apiService.reset();
  }

  postMessage(message: MessageModel): Observable<any>  {
    let patchMsgObserver = this.apiService.postMessage(message);
    this.dynamicSubscriptions.push(patchMsgObserver
      .catch((err,obs) => {
        console.error(err)
        return obs
      })
      .subscribe( 
        result => {
          if (result && result.warn) {
            console.warn(result.warn.text);
          }
          this.evaluateDynamicSubs();
        }
      ))
    return patchMsgObserver;
  }

  // this selects associated for component selectors -> to have a dynamic extansability
  // for future incoming message types and potentially mix different message types together
  // *a case when message is having multiple same configuretion type identifiers 
  // (for instance: Here's a [gift] for you and here's a [gift] for your mother)
  // is NOT accounted currently
  private getMessageConfigiratoComponents(message: MessageModel): Array<MessageComponentConfiguration> {
    let returnArr = [];
    const match = message.template.match(/\[\w+\]/g);
    if (match) {
      match.forEach( configuratorMatchedType => {
        const confType = MessageConfiguratorTypes[configuratorMatchedType]
        if (confType) {
          returnArr.push({
            componentType:  confType,
            pattern:        configuratorMatchedType
          });
        }
      })      
    }
    return returnArr;
  } 
}
