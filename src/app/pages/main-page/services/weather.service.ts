import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, forkJoin, map, Observable, Subject, switchMap, tap} from "rxjs";
import {NOMINATIM_API_URL_TOKEN} from "../../../base/tokens/nominatim-api-url.token";
import {ILocality} from "../../../base/interfaces/locality.interface";
import {WEATHER_API_URL_TOKEN} from "../../../base/tokens/yandex-weather-api-urt.token";
import {IDayWeather} from "../../../base/interfaces/weather.interface";
import {IGeoPosition} from "../../../base/interfaces/geo-position.interface";

@Injectable()
export class WeatherService {
    private _geoLocality$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private _geoPosition$: Subject<IGeoPosition> = new Subject<IGeoPosition>();
    private _weather$: BehaviorSubject<IDayWeather[]> = new BehaviorSubject<IDayWeather[]>([]);

    constructor(
        @Inject(NOMINATIM_API_URL_TOKEN) private _nominatimUrl: string,
        @Inject(WEATHER_API_URL_TOKEN) private _weatherUrl: string,
        private _httpClient: HttpClient
    ) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
            this._geoPosition$.next({lat: position.coords.latitude.toString(), lon: position.coords.longitude.toString()});
        });

        this._geoPosition$.pipe(
            switchMap((position: IGeoPosition) => forkJoin(this.updateGeoLocality(position), this.updateWeather(position)))
        ).subscribe(console.log)
    }
    public getGeoLocality(): Observable<string> {
        return this._geoLocality$.asObservable();
    }


    public getWeather(): Observable<IDayWeather[]> {
        return this._weather$.asObservable();
    }

    public updateGeoPosition(city: string){
        this.fetchGeoPosition(city).pipe(
            tap((response: IGeoPosition[]) => {
                this._geoPosition$.next(response[0])
            })
        ).subscribe()
    }

    private fetchGeoPosition(city: string) {
        return this._httpClient.get<IGeoPosition[]>(`${this._nominatimUrl}/search`, {
            params: {format: 'json', q: city}
        });
    }
    private updateGeoLocality(position: IGeoPosition) {
        console.log(position)
        return this.fetchLocality(position).pipe(
            map((response) => response.address),
            tap((address: ILocality) => this._geoLocality$.next(address.city))
        )
    }
    private updateWeather(position: IGeoPosition) {
        return this.fetchWeather(position).pipe(
            map((response: {forecasts: IDayWeather[]}) => response.forecasts),
            tap((weather: IDayWeather[]) => this._weather$.next(weather))
        )
    }
    private fetchLocality(position: IGeoPosition): Observable<{ address: ILocality }> {
        return this._httpClient.get<{ address: ILocality }>(`${this._nominatimUrl}/reverse`, {
            params: {format: 'json', lat: position.lat, lon: position.lon, zoom: 13}
        });
    }
    private fetchWeather(position: IGeoPosition): Observable<{ forecasts: IDayWeather[] }> {
        return this._httpClient.get<{ forecasts: IDayWeather[] }>(this._weatherUrl,
            {
                params: {lat: position.lat, lon: position.lon, lang: 'ru'}
            }
        )
    }
}
