import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserStats } from '../models/user-models';

@Injectable()
export class RemoteStateService {

  get UserQueRemoteStats(): Observable<UserStats> {
    return this.userQueRemoteStats;
  }

  private userQueRemoteStats: BehaviorSubject<any>

  constructor(private apiService: ApiService) {
    this.userQueRemoteStats =  new BehaviorSubject<any>(false);    
    setTimeout(() => {
      this.apiService.getUserStatsForUserId("someId").subscribe( nextVal => this.userQueRemoteStats.next(nextVal));

      setTimeout(() => {
        //testing remote change
        this.userQueRemoteStats.next(false)
  
        setTimeout(() => {        
          this.userQueRemoteStats.next(
            {
              totallMessagesCount: 20,
              processedCount: 10,
              toProcessCount: 10
            }
          )
        }, 1000)
      }, 1000);
    }, 1000);
  }

}
