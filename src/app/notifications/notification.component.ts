import { Component, animate, style, transition, state, trigger, Input } from '@angular/core';
import {notification} from "../models/notification.model";

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
  animations: [

      trigger('notifStatus', [
            state('pending', style({ background: 'orange', color: '#fff' })),
            state('failed', style({ background: 'red', color: '#fff' })),
            state('finished', style({ background: '#a7f442', color: 'green'})),
            transition('pending => finished', animate('200ms ease-in')),
        ]),
      trigger('notifWidthTrigger', [
            state('expanded', style({ width: '100%', opacity:1 })),
            state('collapsed', style({ opacity: 0 })),
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
