import { Injectable } from '@angular/core';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { FeedService } from './feed.service';
import { IComment } from '../comment.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  /**
   * This class is responsible for interacting with the Web Socket Server (*:4000)
   * We connect to the websocket, and manage the interaction with the socket 
   * in this file
   */

  private readonly socket_endpoint: string = "http://localhost:4000"
  private socket: any;
  private _notifications$: BehaviorSubject<number> = new BehaviorSubject(0); // unseen notifications


  constructor(private feedService : FeedService) { }

  public connect() {
    this.socket = io(this.socket_endpoint)
  }
  
  public disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  /**
   * Listen for broadcasted messages from the server
   */
  public listen(){
    this.socket.on('broadcast', (incomingComment: IComment) => {
      this.feedService.pushCommentToCommentList(incomingComment) // add new comment to our list observable
      this._notifications$.next(this._notifications$.value+1); // increment the notifications based on unseen comment
    });
  }

  public init(){
    this.connect();
    this.listen();
  }

  /**
   * Accessors
   */
  public get notifications (): number {
    return this._notifications$.value;
  }

  public get notitificationsObservable(): Observable<number> {
    return this._notifications$.asObservable();
  }

  public resetNotifitications() {
    this._notifications$.next(0);
  }



  /**
   * Publish a new comment on the stream
   * Unused to prevent concurrency - we post via http and wait for broadcasting
   * to propage any live comment.
   * This approach provides "atomicity" and websocket server failover 
   */
  // // public publish(name: string, comment: string){
  // //   this.socket.emit("new comment", `${name} - ${comment}`);
  // // }

}
