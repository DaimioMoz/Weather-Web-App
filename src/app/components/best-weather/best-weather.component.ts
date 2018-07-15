import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs';

import {WeatherService} from '../../services/weather.service';
import {Weather} from '../../models/weather';

@Component({
  selector: 'app-best-weather',
  templateUrl: './best-weather.component.html',
  styleUrls: ['./best-weather.component.scss']
})
export class BestWeatherComponent implements OnInit {
  weather: Weather;
  capitalsExample = [
    {
      'name': 'Russia',
      'id': 5601538,
      'capital': 'Moscow'
    },
    {
      'name': 'Israel',
      'id': 293198,
      'capital': 'Jerusalem'
    },
    {
      'name': 'Italy',
      'id': 5134295,
      'capital': 'Rome'
    },
    {
      'name': 'Ukraine',
      'id': 703448,
      'capital': 'Kiev'
    },
    {
      'name': 'France',
      'id': 4717560,

      'capital': 'Paris'
    },
    {
      'name': 'Germany',
      'id': 2950159,
      'capital': 'Berlin'
    },
    {
      'name': 'United States',
      'id': 4140963,
      'capital': 'Washington D.C.'
    },
    {
      'name': 'Switzerland',
      'id': 2661552,
      'capital': 'Bern'
    },
    {
      'name': 'Chile',
      'id': 1687801,
      'capital': 'Santiago'
    },
    {
      'name': 'Japan',
      'id': 1850147,
      'capital': 'Tokyo'
    },
    {
      'name': 'China',
      'id': 1816670,
      'capital': 'Beijing'
    },
    {
      'name': 'Georgia',
      'id': 611717,
      'capital': 'Tbilisi'
    },
    {
      'name': 'Greece',
      'id': 4180386,
      'capital': 'Athens'
    },
    {
      'name': 'Poland',
      'id': 756135,
      'capital': 'Warsaw'
    },
    {
      'name': 'Romania',
      'id': 683506,
      'capital': 'Bucharest'
    },
    {
      'name': 'Canada',
      'id': 4905006,
      'capital': 'Ottawa'
    },
    {
      'name': 'Cyprus',
      'id': 146268,
      'capital': 'Nicosia'
    },
    {
      'name': 'Czech Republic',
      'id': 3067696,
      'capital': 'Prague'
    },
    {
      'name': 'Spain',
      'id': 3117735,
      'capital': 'Madrid'
    },
    {
      'name': 'Egypt',
      'id': 360630,
      'capital': 'Cairo'
    },
  ];

  constructor(private weatherSer: WeatherService, private route: ActivatedRoute) {
  }

  capitalsArray = [];
  weatherClass: Weather;

  getBestWeather(capitalsArray, num) {
    this.weatherSer.bestWeather(capitalsArray).subscribe(
      (data) => {
        this.weatherSer.otherWeather(this.weatherSer.selectBestWeather(num, data.list)).subscribe(
          (dataWeather) => {
            this.weatherClass = new Weather(
              dataWeather.name,
              dataWeather.main.temp,
              dataWeather.main.humidity,
              dataWeather.weather[0].description,
              dataWeather.weather[0].icon);
          }
        );
      }
    );
  }

  ngOnInit() {
    for (let i = 0; i < this.capitalsExample.length; i++) {
      this.capitalsArray.push({
        'country': this.capitalsExample[i].name,
        'id': this.capitalsExample[i].id,
        'capital': this.capitalsExample[i].capital
      });
    }
    this.getBestWeather(this.capitalsArray, 21.00);
    this.route.data.subscribe(
      (data: { weatherClass: Weather }) => {
        this.weatherClass = data.weatherClass;
      }
    );
  }

}
