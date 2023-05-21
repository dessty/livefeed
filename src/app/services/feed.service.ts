import { Injectable } from '@angular/core';
import { IComment } from '../comment.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly url: string = "http://localhost:3001"

  private readonly _comments$ = new BehaviorSubject<IComment[]>([]);


  constructor(private http: HttpClient) { }

  /**
   * CRUD API Interfaces
   **/

  public refreshFeed() {
    this.http.get<IComment[]>(`${this.url}/getComments`) // returns an observable to which we subcribe to listen for incoming data from the api call
      .subscribe(comments => this._comments$.next(comments));
  }

  public createComment(data:IComment) {
    this.http.post<IComment>(`${this.url}/createComment`, data)
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



  // public deleteCommentsObservable(){
  //   return this.http.delete(`${this.url}/deleteComments`);
  // }
}
