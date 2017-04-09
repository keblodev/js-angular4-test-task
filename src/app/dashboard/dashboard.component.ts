import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RemoteStateService } from '../service/remote-state.service';
import { Router, ActivatedRoute } from '@angular/router';

import { UserStatsModel } from '../models/user-models';
import { MessageModel } from '../models/message-models';

import { MessageDialogComponent } from '../message/message-dialog/message-dialog.component'
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public messageQue:              Array<MessageModel>

  get userStats() { return this.remoteState.UserQueRemoteStats }

  private subscriptions:          Subscription[] = []
  private currentActiveDialogRef: MdDialogRef<MessageDialogComponent> = null

  constructor(
    private remoteState:  RemoteStateService,
    private router:       Router,
    private route:        ActivatedRoute,
    public  dialog:       MdDialog
    ) {}

  ngOnInit() {
    let filteredRoutes: Observable<any>;

    this.remoteState.evaluateWorkspaceInfo();

    this.subscriptions.push(
      //todo -> ideally to make it with async. something to do in near future
      this.remoteState.MessageQue
        .filter(x => !!x)
        .subscribe(function(nextVal: any) { 
          this.messageQue = nextVal; 
          if (!filteredRoutes) {
            //deep linking is happening here
            filteredRoutes = this.route.params.filter(function(p) {return !!p.messageId});
            this.subscriptions.push(
              filteredRoutes.subscribe( function(route) {
                this.openDialog(route.messageId);
              }.bind(this))
            )          
          }
        }.bind(this))                
    );    
  }

  openDialog(messageId: string = null) {    
    if (!this.currentActiveDialogRef) {
      const message = this.messageQue.find(x => x.messageId === messageId)
      if (message) {
        this.currentActiveDialogRef = this.dialog.open(
          MessageDialogComponent,
            {             
              data: message
            }
          )
        this.subscriptions.push(
          this.currentActiveDialogRef.afterClosed().subscribe((result:MessageModel) => {            
            this.router.navigate(['/dashboard']);
            this.currentActiveDialogRef = null;

            if (result) {
              this.remoteState.postMessage(result);
            }
          })
        ); 
      } else {
        console.error(`[DashboardComponent][openDialog] Invalid message id: ${messageId}`);
      }     
    }
  }   

  logoutUser() {
    this.remoteState.logoutUser().subscribe(response => {
      this.router.navigate(['/login']);
    })
  }

  resetDemo() {
    this.remoteState.resetDemo().subscribe(response => {
      this.router.navigate(['/login']);
    })    
  }

  ngOnDestroy() {
    this.currentActiveDialogRef = null;
    this.subscriptions.forEach(s => s.unsubscribe());
  }  
}
