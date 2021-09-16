import { Component, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cities;

  constructor(private citiesService: CitiesService) {
  }
    ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.citiesService.getCities()
    .subscribe(res => {
      this.cities = res;
    } );
  }
}
