import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {notification} from "../models/notification.model";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class PostJobService {

    Url: string = "http://148.72.250.212:3000/job";
    header: Headers;

    constructor(private http: Http){
        this.header = new Headers();
        this.header.append("Content-Type","application/json");
    }

    postJob(notif: notification){
        
        return this.http.post(this.Url, notif, {headers: this.header});
    }
}