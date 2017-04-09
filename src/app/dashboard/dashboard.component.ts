import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoteStateService } from '../service/remote-state.service';

import { UserStats } from '../models/user-models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userStats: UserStats = {
    totallMessagesCount: 0,
    toProcessCount:      0,
    processedCount:      0  
  }

  constructor(private remoteState: RemoteStateService) {
    this.remoteState.UserQueRemoteStats.subscribe(next => this.userStats=next);
    // this.apiService.getUserStatsForUserId('someId')
    //   .subscribe( next => this.userStats=next );
   }

  ngOnInit() {
  }
  

}
