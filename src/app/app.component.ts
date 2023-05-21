import { Component, OnInit } from '@angular/core';
import { FeedService } from './services/feed.service';
import { IComment } from './comment.interface';
import { Observable } from 'rxjs';

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


  constructor(private feedService: FeedService){}

  ngOnInit(): void {
    this.title = "Test"
    this.feedService.refreshFeed();
    this.comments$ = this.feedService.getCommentsObservable();
  }

  // 
  postComment(): void {
    this.feedService.createComment(<IComment>{ "name": this.name, "message": this.newComment});
  }

  purgeAllComments() {
    this.feedService.deleteComments();
  }
}
