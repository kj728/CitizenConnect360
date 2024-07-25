import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addView, AddViewResponse, IView, View } from '../Models-Angular/Views';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

    private readonly BaseURL = "http://localhost:1000/views/"
    retrievedToken = localStorage.getItem('token') as string;

  constructor(private http:HttpClient) { }



  addView(newView: addView): Observable<AddViewResponse> {
    return this.http.post<AddViewResponse>(this.BaseURL+"addview", newView, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    });
  }

  getAllViews(): Observable<View[]> {
    return this.http.get<View[]>(this.BaseURL, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    })
  }

  getSpecificViewById(id: string): Observable<View> {
    return this.http.get<View>(this.BaseURL + id, {
      headers: new HttpHeaders({
        token: this.retrievedToken
      })
    })
  }

}
