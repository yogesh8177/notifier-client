import { Component, animate, style, transition, state, trigger, OnInit, Input } from '@angular/core';
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
      //Change color based on online status 
      trigger('onlineStatus', [
          state("online", style({ background: "#63bc09", color:'#ecfc14', "box-shadow": "0px 0px 3px 3px green" })),
          state("offline", style({ background: "red", color:'#ffcc00', "box-shadow": "0px 0px 3px 3px red"  })),
          transition("online => offline", animate('200ms ease-in')),
          transition("offline => online", animate('200ms 200ms ease-out'))
      ]),
      //Expand and collapse notification panel
      trigger('panelWidthTrigger', [
            state('expanded', style({ width: '350px' })),
            state('collapsed', style({ width: '38px' })),
            transition('collapsed => expanded', animate('300ms ease-in')),
            transition('expanded => collapsed', animate('300ms 300ms ease-out'))
        ]),
      //Expand and collapse notification menu slider
      trigger('menuWidthTrigger', [
            state('expanded', style({ width: '350px' })),
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
    @Input() tag: string;
    count: number;
    statusMessages: Object = {
        "online": "Connected to the server",
        "offline": "Disconnected from server"
    };

    constructor(private jobService: PostJobService, private socket: SocketService){
        console.log(this.name);
        this.expanded = "collapsed";
        this.onlineStatus = "offline";
        this.tag = "This is a job";
        this.count = 0;
    }

    //Toggle notification panel: expand or collapse
    toggleNavigation(): void{
        this.expanded = this.expanded == "collapsed" ? "expanded" : "collapsed";
        if(this.expanded == "expanded") {
            this.resetUnseenCount();
        }
    }
    //Post a dummy job to web server
    postAJob(){
        let job: notification = this.generateJob();
        this.jobService.postJob(job).subscribe(data => {
            this.response = data.json();
            if(this.response.hasOwnProperty("data") && this.response.data == "success"){
                this.addNotification(job);
                this.response = null;
            }
        }, error => console.log(error));
        console.log('clicked');
    }

    ngOnInit(): void{
        this.notifier = this.socket.getSocket();
        this.handleNotifications(this.notifier);
    }
    //add notification to array
    addNotification(notif: notification): void{
        this.notifications.unshift(notif);
        localStorage.setItem("history",JSON.stringify(this.notifications));
    }
    //generate a dummy job
    generateJob(): notification{
         let notif: notification = {
                                    ID: this.notifier.id,
                                    message: this.tag,
                                    status: "pending",
                                    jobID: new Date().getTime().toString(),
                                    finishTime:""
                                };
        return notif;
    }
    //Handle new notification from notifier service!
    handleNotifications(notifier: any){
        notifier.on('connect', () => {
            this.onlineStatus = "online";
            this.loadHistory(notifier.id);
        });
        notifier.on('disconnect', () => {
            this.onlineStatus = "offline";
        });
        notifier.on('notification',(data: any) => {
            console.log('notification: Job completed! '+data.jobID);
            this.updateNotification(data);
        });
    }
    //Update notification to see if it is completed!
    updateNotification(notif: any): void{
        this.count = this.expanded == "expanded" ? this.count : (this.count + 1);
        //console.log(this.count);
        let length: number = this.notifications.length;

        for(let i= length -1; i >=0; i--){
            if(this.notifications[i].jobID == notif.jobID && this.notifications[i].ID == notif.client){
                this.notifications[i].status = "finished";
                this.notifications[i].message += " -finished";
                this.notifications[i].finishTime = " -- "+new Date().toDateString();
                console.log('called');
            }
        }
        this.addToHistory();
    }
    //Load notification history after web app refresh!
    loadHistory(socketId: any): void{
        let history: any;
        
        this.notifications = [];
        history = JSON.parse(localStorage.getItem("history"));
        if(history != null){
            for(let i=0; i<history.length; i++){
                if(history[i].status == "pending"){
                    history[i].status = "failed";
                    history[i].message += " -failed";
                }
                this.notifications.push(history[i]);
            }
            console.log(history);
            var num = parseInt(localStorage.getItem("unseen_count"));
            this.count = isNaN(num) ? 0 : num;
        }
        
    }
    //add notifications to history
    addToHistory(): void{
        localStorage.setItem("history",JSON.stringify(this.notifications));
        localStorage.setItem("unseen_count", this.count.toString());
    }
    //Clear notifications from history
    clearNotifications():void{
        localStorage.removeItem("history");
        this.notifications.splice(0, this.notifications.length);
        this.resetUnseenCount();
    }
    //reset unseen count when notification panel is expanded
    resetUnseenCount(): void{
        this.count = 0;
        localStorage.setItem("unseen_count", '0');
    }
 
}
