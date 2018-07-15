import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {WeatherComponent} from './components/weather/weather.component';
import {BestWeatherComponent} from './components/best-weather/best-weather.component';
import {HeaderComponent} from './components/header/header.component';
import {ForecastComponent} from './components/forecast/forecast.component';

import {appRouting} from './app.routing';

import {WeatherService} from './services/weather.service';
import {ResolveLocationService} from './services/resolve-location.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    BestWeatherComponent,
    HeaderComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouting,
    ReactiveFormsModule
  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
