import { Injectable } from '@angular/core';
import { addVote, AddVoteResponse } from '../Models-Angular/Votes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPollResponse } from '../Models-Angular/Poll';

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private http:HttpClient) { }

  private readonly BaseURL = "http://localhost:1000/polls/"
  retrievedToken = localStorage.getItem('token') as string;


  
  addVote(newVote: addVote): Observable<AddVoteResponse> {
    return this.http.post<AddPollResponse>(this.BaseURL+ "addvote" , newVote, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }
}
