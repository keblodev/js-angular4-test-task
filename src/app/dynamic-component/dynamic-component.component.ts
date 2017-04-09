import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  ComponentFactoryResolver, 
  ViewContainerRef, 
  ViewChild, 
  ReflectiveInjector,
  EventEmitter
} from '@angular/core';

import { NameAutocompleteComponent } from '../message/message-configurators/name-autocomplete/name-autocomplete.component'; 
import { GiftpickerComponent } from '../message/message-configurators/giftpicker/giftpicker.component'; 
import { DatepickerComponent } from '../message/message-configurators/datepicker/datepicker.component'; 

import { MessageConfiguratorTypes } from '../statics/message-types';
import { MessageComponentConfiguration } from '../models/message-models';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css'],
  entryComponents: [
    NameAutocompleteComponent, 
    GiftpickerComponent, 
    DatepickerComponent
  ]
})
export class DynamicComponentComponent implements OnInit {
  currentComponent = null;
  
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
 // inputs: An object with key/value pairs mapped to input name/input value

  @Input() set componentData(data: { componentConfiguration: MessageComponentConfiguration, inputs: any }) {
    
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {
      return { provide: inputName, useValue: data.inputs[inputName]};
    });

    inputProviders.push(
      { provide: 'associatedComponentConfiguration', useValue: data.componentConfiguration}
    );

    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(
      resolvedInputs,
      this.dynamicComponentContainer.parentInjector);

    const componentRef = this.dynamicComponentReferences[data.componentConfiguration.componentType];
    if (!componentRef) {
      return;
    }

    // factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(componentRef);

    // creates the component using the factory and the injector
    let component = factory.create(injector);
    
    // insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);

    // Destroy the previously created component
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }  

  //is needed to avoid circular dependency injection in remote-state.service
  private dynamicComponentReferences = {
    'NameAutocompleteComponent':  NameAutocompleteComponent,
    'GiftpickerComponent':        GiftpickerComponent,
    'DatepickerComponent':        DatepickerComponent
  }

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {}
}
