import { Component, OnInit } from '@angular/core';
import { CitiesService, City } from './services/cities.service';
import { NumberedClockComponent } from './components/numbered-clock/numbered-clock.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NumberedClockComponent],
  providers: [CitiesService],
})
export class AppComponent implements OnInit {
  public cities: City[] = [];

  constructor(private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.citiesService.getCities().subscribe((res: City[]) => {
      this.cities = res;
    });
  }
}
