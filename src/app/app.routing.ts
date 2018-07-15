import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {WeatherComponent} from './components/weather/weather.component';
import {ForecastComponent} from './components/forecast/forecast.component';
import {ResolveLocationService} from './services/resolve-location.service';
import {BestWeatherComponent} from './components/best-weather/best-weather.component';

const WEATHER_ROUTER: Routes = [
  {path: '', component: WeatherComponent, resolve: {weatherClass: ResolveLocationService}},
  {path: 'best-weather', component: BestWeatherComponent},
  {path: 'forecast', component: ForecastComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTER);
