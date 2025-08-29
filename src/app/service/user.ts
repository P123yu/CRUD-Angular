import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../util/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  private url: string = AppConstants.API_BASE_URL + '/user';

  // get all users

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + '/read-all');
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.url + '/create', data);
  }



  updateUser(data: any): Observable<any> {
    return this.http.put(this.url + '/update', data);
  }
}
