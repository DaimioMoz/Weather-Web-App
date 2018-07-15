import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs';

import {Weather} from '../models/weather';
import {map} from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private weather: Weather[] = [];
  weatherClass: Weather;
  location;
  locationUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=4f016f8fb35e5e274ea575cc15176ba2';
  forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4f016f8fb35e5e274ea575cc15176ba2';
  bestUrl = 'http://api.openweathermap.org/data/2.5/group?units=metric&appid=4f016f8fb35e5e274ea575cc15176ba2';

  constructor(private http: Http) {
  }

  currentLocation() {
    return new Promise((res) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`${this.locationUrl}&lat=${lat}&lon=${lon}&units=imperial`)
          .pipe(
            map((response) => response.json())
          ).toPromise().then(
            (data) => {
              this.weatherClass = new Weather(
                data.name,
                data.main.temp,
                data.main.humidity,
                data.weather[0].description,
                data.weather[0].icon);
              res(this.weatherClass);
              return this.weatherClass;
            }
          );
      });
    });
  }

  otherWeather(city: string) {
    return this.http.get(`${this.locationUrl}&q=${city}&cnt=10`)
      .pipe(map((response) => response.json()));
  }

  bestWeather(city: any[]) {
    const cityString = [];
    for (let i = 0; i < city.length; i++) {
      cityString.push(city[i].id);
    }
    return this.http.get(`${this.bestUrl}&id=${cityString.join(',')}`)
      .pipe(map((response) => response.json()));
  }

  selectBestWeather(num, arr) {
    let curr = arr[0].main.temp;
    let diff = Math.abs(num - curr);
    for (let i = 0; i < arr.length; i++) {
      const newDiff = Math.abs(num - arr[i].main.temp);
      if (newDiff < diff) {
        diff = newDiff;
        curr = arr[i];
      }
    }
    return curr.name;
  }

  otherForecast(city: string) {
    return this.http.get(`${this.forecastUrl}&q=${city}`)
      .pipe(map((response) => response.json()));
  }

}
