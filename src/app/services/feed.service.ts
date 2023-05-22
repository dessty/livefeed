import { Injectable } from '@angular/core';
import { IComment } from '../comment.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly api_endpoint: string = "http://localhost:3001"

  private readonly _comments$ = new BehaviorSubject<IComment[]>([]);


  constructor(private http: HttpClient) { }

  /**
   * CRUD API Interfaces
   **/

  public refreshFeed() {
    this.http.get<IComment[]>(`${this.api_endpoint}/getComments`) // returns an observable to which we subcribe to listen for incoming data from the api call
      .subscribe(comments => this._comments$.next(comments));
  }

  public createComment(data:IComment) {
    this.http.post<IComment>(`${this.api_endpoint}/createComment`, data)
      .subscribe(data => {
        console.log(data);
        this.refreshFeed();
      })
  }

  public getCommentsObservable() {
    return this._comments$.asObservable();
  }

  // public getCommentObservable(): Observable<IComment>{
  //   return this.getAllComments().as
  // }



  public deleteComments(){
    this.http.delete(`${this.api_endpoint}/deleteComments`)
      .subscribe(data => {
        console.log(data);
        this.refreshFeed();
      });
  }
}
