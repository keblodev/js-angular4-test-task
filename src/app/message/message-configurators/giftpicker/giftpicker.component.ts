import { Component, OnInit, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

import { MessageComponentConfiguration } from '../../../models/message-models';

@Component({
  selector: 'app-giftpicker',
  templateUrl: './giftpicker.component.html',
  styleUrls: ['./giftpicker.component.css']
})
export class GiftpickerComponent implements OnInit {

  private dynamicComponentObservable: BehaviorSubject<any>
  private associatedComponentConfiguration: MessageComponentConfiguration

  set selectedValue(newValue) {  
    this.dynamicComponentObservable.next({
      value: newValue.title,
      valueObj: newValue,
      componentConfiguration: this.associatedComponentConfiguration
    });
  }

  get gifts() { return this.remoteState.MessageGifts }  

  constructor(
    private  remoteState: RemoteStateService,
    private injector: Injector) {
    this.dynamicComponentObservable = this.injector.get('dynamicComponentObservable');
    this.associatedComponentConfiguration = this.injector.get('associatedComponentConfiguration');
  }

  ngOnInit() {}  
}
