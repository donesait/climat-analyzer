import {InjectionToken} from "@angular/core";

export const NOMINATIM_API_URL_TOKEN: InjectionToken<string> = new InjectionToken<string>('nominatim_api_url_token', {
    factory: () => 'https://nominatim.openstreetmap.org',
    providedIn: "root"
})
