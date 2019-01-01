import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpService: HttpClient) { }

  getCities() {
    return this.httpService.get('../../assets/json/cities.json');
  }
}
