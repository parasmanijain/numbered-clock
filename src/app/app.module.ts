import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CitiesService } from './services/cities.service';
import { NumberedClockComponent } from './components/numbered-clock/numbered-clock.component';


@NgModule({
  declarations: [
    AppComponent,
    NumberedClockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
