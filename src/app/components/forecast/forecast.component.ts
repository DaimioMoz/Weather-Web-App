import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {WeatherService} from '../../services/weather.service';
import {Forecast} from '../../models/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherSer: WeatherService) {
  }

  forecastForm: FormGroup;
  forecast: Forecast[] = [];
  forecastCityName = '';

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    });
  }

  onSubmit() {
    this.forecast.splice(0, this.forecast.length);
    this.weatherSer.otherForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        this.forecastCityName = data.city.name;
        for (let i = 0; i < data.list.length; i = i + 8) {
          const forecastWeather = new Forecast(
            data.city.name,
            data.list[i].weather[0].description,
            data.list[i].main.temp,
            data.list[i].main.humidity,
            data.list[i].dt_txt,
            data.list[i].weather[0].icon);
          this.forecast.push(forecastWeather);
        }
        return this.forecast;
      }
    );
  }
}
