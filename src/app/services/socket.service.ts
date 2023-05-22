import { Injectable } from '@angular/core';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly socket_endpoint: string = "http://localhost:4000"
  private socket: any;
  constructor() { }

  public connect() {
    console.log("client is connecting to the socket server on port 4000")
    this.socket = io(this.socket_endpoint)
  }


  public disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  public emitComment(name: string, comment: string){
    this.socket.emit("new comment", `${name} - ${comment}`);
  }

  public listen(){
    this.socket.on('broadcast', (data: string) => {
      console.log("YALLA", data);
    });
  }

  public init(){
    this.connect();
    this.listen();
  }
}
