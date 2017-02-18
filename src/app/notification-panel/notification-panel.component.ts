import { Component, animate, style, transition, state, trigger, OnInit } from '@angular/core';
import {notification} from "../models/notification.model";
import {PostJobService} from "../services/post-job.service";
import {SocketService} from "../services/socket.service";

@Component({
  moduleId: module.id,
  selector: 'notification-panel',
  templateUrl: 'notification-panel.component.html',
  styleUrls: ['notification-panel.component.css'],
  providers: [PostJobService, SocketService],
  animations: [

      trigger('onlineStatus', [
          state('online', style({ background: "#63bc09" })),
          state('offline', style({ background: "red" })),
          transition('online => offline', animate('200ms ease-in')),
          transition('offline => online', animate('200ms 200ms ease-out'))
      ]),
      trigger('panelWidthTrigger', [
            state('expanded', style({ width: '300px' })),
            state('collapsed', style({ width: '38px' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms 200ms ease-out'))
        ]),
      trigger('menuWidthTrigger', [
            state('expanded', style({ width: '300px' })),
            state('collapsed', style({ width: '45px' })),
            transition('collapsed => expanded', animate('200ms ease-in')),
            transition('expanded => collapsed', animate('200ms 200ms ease-out'))
        ])
    
  ]
})
export class NotificationPanelComponent implements OnInit { 
    expanded: string;
    onlineStatus: string;
    notifications: notification[] = [];
    name = 'Angular'; 
    response: any;
    notifier: any;
    tag: string;
    count: number;

    constructor(private jobService: PostJobService, private socket: SocketService){
        console.log(this.name);
        this.expanded = "collapsed";
        this.onlineStatus = "offline";
        this.tag = "Job 1";
        this.count = 0;
    }

    toggleNavigation(): void{
        this.expanded = this.expanded == "collapsed" ? "expanded" : "collapsed";
        if(this.expanded == "expanded") this.count = 0;
    }

    postAJob(){
        let job: notification = this.generateJob();
        this.jobService.postJob(job).subscribe(data => {
            this.response = data.json();
            if(this.response.hasOwnProperty("data") && this.response.data == "success"){
                this.addNotification(job);
                this.response = null;
            }
        }, error => console.log(error));
    }

    ngOnInit(): void{
        this.notifier = this.socket.getSocket();
        this.handleNotifications(this.notifier);
    }

    addNotification(notif: notification): void{
        this.notifications.unshift(notif);
        localStorage.setItem("history",JSON.stringify(this.notifications));
    }

    generateJob(): notification{
         let notif: notification = {
                                    ID: this.notifier.id,
                                    message: this.tag,
                                    status: "pending",
                                    jobID: new Date().getTime().toString()
                                };
        return notif;
    }

    handleNotifications(notifier: any){
        notifier.on('connect', () => {
            this.onlineStatus = "online";
            this.loadHistory(notifier.id);
        });
        notifier.on('disconnect', () => {
            this.onlineStatus = "offline";
        });
        notifier.on('notification',(data) => {
            console.log('notification: Job completed! '+data.jobID);
            this.updateNotification(data);
        });
    }

    updateNotification(notif: any): void{
        this.count = this.expanded == "expanded" ? this.count : (this.count + 1);
        //console.log(this.count);
        let length: number = this.notifications.length;

        for(let i= length -1; i >=0; i--){
            if(this.notifications[i].jobID == notif.jobID){
                this.notifications[i].status = "finished";
                this.notifications[i].message = notif.job+" finished";
            }
        }
        localStorage.setItem("history",JSON.stringify(this.notifications));
    }

    loadHistory(socketId): void{
        let history: any;

        history = JSON.parse(localStorage.getItem("history"));
        if(history != null){
            for(let i=0; i<history.length; i++){
                if(history[i].status == "pending"){
                    history[i].status = "failed";
                    history[i].message += " failed";
                }
                this.notifications.push(history[i]);
            }
            console.log(history);
        }
        
    }

    clearNotifications():void{
        localStorage.removeItem("history");
        this.notifications.splice(0, this.notifications.length);
    }
 
}
