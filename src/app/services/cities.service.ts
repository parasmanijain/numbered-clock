import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Enhanced City interface with additional properties for the clock component
export interface City {
  id: number;
  name: string;
  country: string;
  timezone: string;
  displayDate: boolean;
  displayName: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private readonly http: HttpClient) {}

  // Use Angular 15+ typed HttpClient with proper error handling
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/json/cities.json');
  }
}
