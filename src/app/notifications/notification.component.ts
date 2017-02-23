import { Component, animate, style, transition, state, trigger, Input } from '@angular/core';
import {notification} from "../models/notification.model";


@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  animations: [
      //Animate based on notification statuses
      trigger('notifStatus', [
            state('pending', style({ background: '#fff', color: 'orange', "border-bottom":"1px solid orange" })),
            state('failed', style({ background: '#fff', color: 'red', "border-bottom":"1px solid red" })),
            state('finished', style({ background: '#fff', color: 'green', "border-bottom":"1px solid green"})),
            transition('pending => finished', animate('200ms ease-in')),
        ]),
      //Hide notification details when notification collapses
      trigger('notifWidthTrigger', [
            state('expanded', style({ width: '100%', display:'inline' })),
            state('collapsed', style({ display: 'none' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms 200ms ease-out'))
        ])
  ]
})
export class NotificationComponent  { 
    @Input() expanded: string;
    @Input() notif: notification;

    constructor(){
        
    }

 
}
