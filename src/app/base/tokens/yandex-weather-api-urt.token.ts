import {InjectionToken} from "@angular/core";

export const WEATHER_API_URL_TOKEN: InjectionToken<string> = new InjectionToken<string>('weather_api_url_token', {
    // обход ошибки CORS Missing Allow Origin
    factory: () :string => 'https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v2/forecast',
    providedIn: "root"
})
