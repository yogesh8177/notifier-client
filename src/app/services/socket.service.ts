import { Observable } from 'rxjs/Observable'; 
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketService{

    //private Url: string = "http://localhost:3001";
    private Url: string = "http://148.72.250.212:3001";
    public socket: any;

    constructor(){
        
    }

    getSocket(): any{
        this.socket = io(this.Url);
        return this.socket;
    }

   

    
}