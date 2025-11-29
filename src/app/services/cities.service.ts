import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1️⃣ Define a model for city (recommended)
export interface City {
  id: number;
  name: string;
  country: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  constructor(private http: HttpClient) {}

  // 2️⃣ Use Angular 15+ typed HttpClient
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/json/cities.json');
  }
}
