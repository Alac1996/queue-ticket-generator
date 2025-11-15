import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private apiUrl = 'https://localhost:5001/api/queue';

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<string> {
    return this.http.get(this.apiUrl + '/current', {
      responseType: 'text' as 'text'
    });
  }

  next(): Observable<string> {
    return this.http.post(this.apiUrl + '/next', {}, {
      responseType: 'text' as 'text'
    });
  }

  reset(): Observable<string> {
    return this.http.post(this.apiUrl + '/reset', {}, {
      responseType: 'text' as 'text'
    });
  }
}
