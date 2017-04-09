import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MessageModel } from '../models/message-models';

@Component({
  selector: 'message-component',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: MessageModel;  
  constructor() {}
  ngOnInit() {} 
}


