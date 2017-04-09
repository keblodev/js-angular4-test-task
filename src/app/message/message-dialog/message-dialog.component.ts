import { Component, OnInit, Inject, Input, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { MessageModel } from '../../models/message-models';

import { NameAutocompleteComponent } from '../message-configurators/name-autocomplete/name-autocomplete.component'; 
import { GiftpickerComponent } from '../message-configurators/giftpicker/giftpicker.component'; 
import { DatepickerComponent } from '../message-configurators/datepicker/datepicker.component'; 

import { MessageConfiguratorTypes } from '../../statics/message-types';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
  providers: [MdDialog]
})
export class MessageDialogComponent implements OnInit  {

  @Input() messageConfigurators:            Array<Component>

  public isReady:                           BehaviorSubject<Boolean>
  
  public message:                           MessageModel
  public messageTextCompiled:               string            
  public associatedConfiguratorComponents:  Array<Component>
  public currentReplacementsMap:            any = {}

  public dynamicComponentObservableValue:   BehaviorSubject<any> = new BehaviorSubject<any>(false)

  private subscriptions:                    Subscription[] = []

  constructor(
    @Inject(MD_DIALOG_DATA) public data: MessageModel,
    public dialogRef: MdDialogRef<MessageDialogComponent>,
    private ref: ChangeDetectorRef
    ) {
      this.message = data;
      this.messageTextCompiled = this.message.template;
      this.associatedConfiguratorComponents = this.message.associatedComponents;
  }

  ngOnInit() {
    this.isReady = new BehaviorSubject<Boolean>(false);
    this.subscriptions.push(
      this.dynamicComponentObservableValue.filter(x => !!x)
        .subscribe( (newVal: any) => {
          //message template processing is located here
          let textToProcess = this.message.template;
          if (newVal.value) {   
            this.currentReplacementsMap[newVal.componentConfiguration.pattern] = newVal.value;         
          } else {
            delete this.currentReplacementsMap[newVal.componentConfiguration.pattern]
          }            
          
          for (const key in this.currentReplacementsMap) {
              textToProcess = textToProcess.replace(
                  key, 
                  this.currentReplacementsMap[key]
                );
          }

          this.isReady.next( Object.keys(this.currentReplacementsMap).length 
      === this.associatedConfiguratorComponents.length);

          this.messageTextCompiled = textToProcess;   
          this.message.messageTextCompiled = textToProcess;
          //for whate ever hell reason Change detector in RC4 would not 
          // changes to this.isReady, so I'm forsing it to
          this.ref.detectChanges()      
        })
    )
  } 

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  onDialogClose() {
    this.dialogRef.close(this.message);
  }
}