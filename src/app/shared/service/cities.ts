import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cities {

  private citiesSubject = new BehaviorSubject<string[]>([]);
  cities$ = this.citiesSubject.asObservable();

  setCities(cities: string[]) {
    this.citiesSubject.next(cities);
  }

  // getCities() {
  //   return this.citiesSubject.asObservable();
  // }


  // // ✅ add getCities method
  // getCities(): string[] {
  //   return this.citiesSubject.getValue(); // returns the latest city list
  // }

}
