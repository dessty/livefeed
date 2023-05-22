import { Injectable } from '@angular/core';
import { IComment } from '../comment.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  /**
 * This class is responsible for interacting with the Backend WebServer API (*:3001)
 * We consume that API, and manage the business logic with the functions 
 * in this file
 */

  private readonly api_endpoint: string = "http://localhost:3001"
  private readonly _comments$ = new BehaviorSubject<IComment[]>([]);


  constructor(private http: HttpClient) { }

  /**
   * CRUD API Interfaces
   **/

  public refreshFeedAPI() {
    // return an observable to which we subcribe to listen for incoming data from the api call
    this.http.get<IComment[]>(`${this.api_endpoint}/getComments`) 
      .subscribe(comments => this._comments$.next(comments));
  }

  public createCommentAPI(data:IComment) {
    this.http.post<IComment>(`${this.api_endpoint}/createComment`, data)
      .subscribe(data => {
        console.log(data);
      })
  }

  public deleteCommentsAPI() {
    this.http.delete(`${this.api_endpoint}/deleteComments`)
      .subscribe(data => {
        this.refreshFeedAPI();
      });
  }


  /**
   * Manipulate our service object 
   */
  public pushCommentToCommentList(comment: IComment) {
    this._comments$.next([...this._comments$.getValue(), comment]);
  }

  public getCommentsObservable() {
    return this._comments$.asObservable();
  }
}
