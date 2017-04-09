import { Component, OnInit, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RemoteStateService } from '../../../service/remote-state.service';

import { MessageComponentConfiguration } from '../../../models/message-models';

@Component({
  selector: 'app-name-autocomplete',
  templateUrl: './name-autocomplete.component.html',
  styleUrls: ['./name-autocomplete.component.css']
})
export class NameAutocompleteComponent implements OnInit {

  private dynamicComponentObservable: BehaviorSubject<any>
  private associatedComponentConfiguration: MessageComponentConfiguration

  private _selectedValue: any 

  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(newValue) {
    this.dynamicComponentObservable.next({
      value: newValue && newValue.value,
      valueObj: newValue,
      componentConfiguration: this.associatedComponentConfiguration
    });

    this._selectedValue = newValue;
  }

  get messageNames() { return this.remoteState.MessageNames }

  stateCtrl: FormControl
  filteredNames: any

  constructor(
    private  remoteState: RemoteStateService,
    private injector: Injector) {
    this.dynamicComponentObservable = this.injector.get('dynamicComponentObservable');
    this.associatedComponentConfiguration = this.injector.get('associatedComponentConfiguration');

    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges
        .startWith(null)
        .forEach( name => {
          this.filteredNames = this.filterNames(name);
        })
  }

  filterNames(val: string) {
    if (!val && this.selectedValue) {
      this.selectedValue = null;
    }
    return val ? this.messageNames.map(collection => {
                  const filteredCollection = collection.filter(s => new RegExp(`^${val}`, 'gi').test(s['value']))
                  if (filteredCollection.length > 0) {
                    this.selectedValue = filteredCollection[0];
                  } else {
                    this.selectedValue = null;
                  }
                  return filteredCollection;                  
                })
               : this.messageNames;
  }  

  ngOnInit() {}

}
