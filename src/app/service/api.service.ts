import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { UserStatsModel } from '../models/user-models';

import { RemoteValuesStoreService, PersistableStoreKeyNames } from './remote-values-store.service';

@Injectable()
export class ApiService {

  private loggin: Boolean = true;
  
  constructor(
    private http: Http,
    private remoteValuesStoreService: RemoteValuesStoreService
    ) {}

  getUserStats(): Observable<UserStatsModel> {
    return this.http.get(`api/users/${this.getUserId()}/messages/stats`)
      .map(response => response.json());
  }

  getNextMessageCollection(): Observable<any> {  
    return this.http.get(`api/users/${this.getUserId()}/messages`)
      .map(response => response.json());        
  }

  getGifts(): Observable<any> {  
    const specialGiftsListFromStore = this.remoteValuesStoreService
      .getValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageSpecialGifts);
    if (specialGiftsListFromStore) {
      return Observable.from([specialGiftsListFromStore.value]);
    } else {    
      return this.http.get(`api/users/${this.getUserId()}/message/gifts`)
        .map(response => {
          const responseSerialized = response.json();

          this.remoteValuesStoreService
            .setValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageSpecialGifts, responseSerialized)
          return responseSerialized;        
        });
    }
  }

  getSpecialGifts(): Observable<any> {
    const giftsListFromStore = this.remoteValuesStoreService
      .getValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageGifts);
    if (giftsListFromStore) {
      return Observable.from([giftsListFromStore.value]);
    } else {
    return this.http.get(`api/users/${this.getUserId()}/message/gifts/specials`)
      .map(response => {
        const responseSerialized = response.json();

        this.remoteValuesStoreService
          .setValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageGifts, responseSerialized)
        return responseSerialized;        
      });
    }
  }  

  getNamesList(): Observable<any> {
    const namesListFromStore = this.remoteValuesStoreService
      .getValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageNames);
    if (namesListFromStore) {
      return Observable.from([namesListFromStore.value]);
    } else {
      return this.http.get(`api/users/${this.getUserId()}/message/names`)
        .map(response => {
          const responseSerialized = response.json();
          this.remoteValuesStoreService
            .setValueByStoreKey(PersistableStoreKeyNames.MessangerAppMessageNames, responseSerialized)
          return responseSerialized;
        });
    }   
  }

  login(userCredentials) {
    return this.http.post(`/api/login`, userCredentials)
      .map(response => response.json())
  }

  auth() {    
    const token = this.getAuthToken();
    if (!token) {
      return Observable.of([]);
    } else {
      return this.http.post(`/api/auth`, {
        authToken: token
      }).map(response => response.json());
    }
  }

  postMessage(message) {
    return this.http
      .patch(`/api/users/${this.getUserId()}/messages/${message.messageId}/update`, message)
      .map(response => response.json());
  }
  
  logout() {
    const userId = this.getUserId();

    return this.http.post(`/api/logout`, {
      userId: userId
    }).map(response => {
      //yes -> ideally all store operations should be in remoteValuesStoreService
      localStorage.removeItem('messageAppUserId');
      localStorage.removeItem('messageAppAuthToken');

      return response.json()
    });
  }

  //for demo purpose only
  reset() {
    const userId = this.getUserId();

    return this.http.post(`/api/reset`, {
      userId: userId
    }).map(response => {
      
      //yes -> ideally all store operations should be in remoteValuesStoreService
      localStorage.removeItem('messageAppUserId');
      localStorage.removeItem('messageAppAuthToken');

      this.remoteValuesStoreService.resetStore()
      return response.json()
    });
  }

  private getUserId() {
    const userId = localStorage.getItem('messageAppUserId');

    if (userId) {
      return userId;
    } else {
      if (this.loggin) {
        console.warn("[getUser]user id not found -> redirecting to login")
      }
      return false;
    }
  }

  private getAuthToken() {
    const authToken = localStorage.getItem('messageAppAuthToken');
    if (authToken) {
      return authToken;
    } else {
      if (this.loggin) {
        console.warn("[getAuthToken]token not found -> redirecting to login")
      }
      return false;
    }
  }
}
