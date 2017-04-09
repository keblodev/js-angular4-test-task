import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { UserStats } from '../models/user-models';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  //a sparce version of mail collection
  //todo: do return type insetead of any
  getUserStatsForUserId(id: string): Observable<UserStats> {
    const returnPromise = new Promise(
        resolve => resolve({ 
            totallMessagesCount: 100,
            toProcessCount:      40,
            processedCount:      60,                  
        })
      );
    return Observable.fromPromise(returnPromise);

    //TODO:
    // return this.http.get(`api/users/${id}/mails&sparce=true`)
    //   .map(response => response.json());
  }

  //todo: do return type insetead of any
  getNextMessageCollection(): Observable<any> {
    const returnPromise = new Promise(
        resolve => resolve({ messages: [
            {
              messageId:    'someMsgId1',
              isProcessed:  false,
              messageType:  'personBdType',
              content: 'Mate1, Happy Birthday. \n To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.',
            },
            {
              messageId:    'someMsgId2',
              isProcessed:  false,
              messageType:  'babyBdType',
              content: 'Whooa1 well done and congratulations on the birth of [babyname] on [birthdate].',
            },          
            {
              messageId:    'someMsgId3',
              isProcessed:  false,
              messageType:  'babyBdType',
              content: 'Whooa2 well done and congratulations on the birth of [babyname] on [birthdate].',
            },          
            {
              messageId:    'someMsgId4',
              isProcessed:  false,
              messageType:  'personBdType',
              content: 'Mate2, Happy Birthday. \n To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.',
            },
            {
              messageId:    'someMsgId5',
              isProcessed:  false,
              messageType:  'personBdType',
              content: 'Mate3, Happy Birthday. \n To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.',
            },            
          ]          
        })
      );
    return Observable.fromPromise(returnPromise);    
  }

  //todo: do return type insetead of any
  getGiftsForUserAndMessageId(userId: string, messageId: string): Observable<any> {
    const returnPromise = new Promise(
        resolve => resolve({messages: [
          {
            giftId:    'someGiftId1',
            giftType:  'giftType1',
            title:     'someGiftTitle1',
            descr:     'someDescr1',
            imageUrl:  'some-gift-image-url1.jpg'
          },
          {
            giftId:    'someGiftId2',
            giftType:  'giftType2',
            title:     'someGiftTitle2',
            descr:     'someDescr2',
            imageUrl:  'some-gift-image-url2.jpg'
          },
        ]})
      );
    return Observable.fromPromise(returnPromise);

    //TODO:
    // return this.http.get(`api/users/${id}/gifts`)
    //   .map(response => response.json());    
  }

  //todo: do return type insetead of any
  getSpecialGiftsForUserAndMessageId(id: string): Observable<any> {
    const returnPromise = new Promise(
        resolve => resolve({gifts: [
          {
            giftId:    'someSpecialGiftId1',
            giftType:  'specialGiftType1',
            title:     'someSpecialGiftTitle1',
            descr:     'someSpecialDescr1',
            imageUrl:  'some-specialgift-image-url1.jpg'
          },
          {
            giftId:    'someSpecialGiftId2',
            giftType:  'specialGiftType2',
            title:     'someSpecialGiftTitle2',
            descr:     'someSpecialDescr2',
            imageUrl:  'some-specialgift-image-url2.jpg'
          },
        ]})
      );
    return Observable.fromPromise(returnPromise);

    //TODO:
    // return this.http.get(`api/users/${id}/gifts/specials`)
    //   .map(response => response.json());    
  }  

  //todo: do return type insetead of any
  getNamesListForUserAndMessageId(userId: string, messageId: string): Observable<any> {
    const returnPromise = new Promise(
        resolve => resolve({names: [
          {
            name: 'Joghn'
          },
          {
            name: 'NotJohn'
          },
        ]})
      );
    return Observable.fromPromise(returnPromise);    
  }

}
