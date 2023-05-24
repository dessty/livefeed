import { Component, OnInit } from '@angular/core';
import { FeedService } from './services/feed.service';
import { IComment } from './comment.interface';
import { Observable } from 'rxjs';
import {NgForm} from '@angular/forms';
import { SocketService } from './services/socket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public comments$ : Observable<IComment[]> = new Observable<IComment[]>();
  public newComment :string | undefined;
  public username: string | undefined;


  constructor(private feedService: FeedService,
              private socketService: SocketService,
              private cookieService: CookieService){}

  /**-------------------
   * Lifecycle hooks
   * -----------------*/
  ngOnInit(): void {

    // Retrieve name stored session 
    this.username = this.cookieService.get('cf-username') || undefined;

    // connect to the websocket and listen for incomming broadcast
    this.socketService.init();

    // load comments from DB
    this.feedService.refreshFeedAPI();
    this.comments$ = this.feedService.getCommentsObservable();
      
    // listen for a new notifications
    this.socketService.notitificationsObservable.subscribe(notifications => {
      
      if (notifications > 0){
        // scroll to the new comments we were notified for
        const element = document.querySelector(".comment:last-child");
        if (element){
          setTimeout(() => {
            element.parentElement?.scrollBy(0,  element.scrollHeight + 30);
          }, 100); element.scrollIntoView({ behavior: "auto", block: "end"});
          
          // reset unseen notifications to 0 now that the user has read over them
          this.socketService.resetNotifitications();

        }
      }
    })
  }

  ngOnDestroy() {
    this.socketService.disconnect(); // we close the socket connection
    this.cookieService.delete("cf-username"); // clear session cookies
  }

  /**-------------------
   * Class functions
   * -----------------*/

  postComment(formData: NgForm): void {
    this.newComment = formData.value.commentInput;
    if(this.newComment && this.newComment !== ""){
      this.feedService.createCommentAPI(<IComment>{ "name": this.username, "message": this.newComment});
      formData.reset();
    }
  }

  deleteAllComments() {
    this.feedService.deleteCommentsAPI();
  }

  registerUser(formData: NgForm){
    this.username = formData.value.nameInput;
    if (this.username && this.username !== "")
      this.cookieService.set("cf-username", this.username)
  }
}
