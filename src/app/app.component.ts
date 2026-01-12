import { Component, OnInit } from '@angular/core';
import { CitiesService } from './services/cities.service';
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
  public cities: any[] = [];

  constructor(private citiesService: CitiesService) {}
  ngOnInit() {
    this.getCities();
  }

  getCities() {
    this.citiesService.getCities().subscribe((res) => {
      this.cities = res as any[];
    });
  }
}
