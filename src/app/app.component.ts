import { Component, OnInit } from '@angular/core';
import { FeedService } from './services/feed.service';
import { IComment } from './comment.interface';
import { Observable } from 'rxjs';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Mailchimp Real Time Comment Feed';
  public comments$ : Observable<IComment[]> = new Observable<IComment[]>();
  public newComment :string | undefined = "test";
  public name: string | undefined = "test";


  constructor(private feedService: FeedService,
              private socketService: SocketService){}

  ngOnInit(): void {
    this.title = "Test"

    // connect to the websocket and listen for incomming broadcast
    this.socketService.init();

    // load comments from DB
    this.feedService.refreshFeedAPI();
    this.comments$ = this.feedService.getCommentsObservable();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  // 
  postComment(): void {
    this.feedService.createCommentAPI(<IComment>{ "name": this.name, "message": this.newComment});
  }

  purgeAllComments() {
    this.feedService.deleteCommentsAPI();
  }
}
