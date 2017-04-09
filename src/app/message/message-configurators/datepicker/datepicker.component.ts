import { Component, OnInit, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

import { MessageComponentConfiguration } from '../../../models/message-models';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  
  private dynamicComponentObservable: BehaviorSubject<any>
  private associatedComponentConfiguration: MessageComponentConfiguration 

  set selectedValue(newValue: Date) {
    if (newValue) {
      this.dynamicComponentObservable.next({
        value: newValue.toLocaleDateString(),
        valueObj: newValue,
        componentConfiguration: this.associatedComponentConfiguration
      }); 
    }   
  }

  constructor(
    private  remoteState: RemoteStateService,
    private injector: Injector) {
    this.dynamicComponentObservable = this.injector.get('dynamicComponentObservable');
    this.associatedComponentConfiguration = this.injector.get('associatedComponentConfiguration');
  }

  ngOnInit() {}
}
