import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cities } from '../shared/service/cities';
import { AppConstants } from '../util/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly http = inject(HttpClient);
  private readonly cityService = inject(Cities);

  private url: string = AppConstants.API_BASE_URL + '/user';

  // get all users

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.url + '/read-all').pipe(
      tap((users) => {
        this.cityService.setCities(users?.data?.map((user: any) => user.city));
      })
    );
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/create', data);
  }

  updateUser(data: any): Observable<any> {
    return this.http.put<any>(this.url + '/update', data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.url + '/delete/' + id);
  }

  // get list of city
}
