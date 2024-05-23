import {Component, OnInit} from '@angular/core';
import {TuiInputModule} from "@taiga-ui/kit";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule} from "@taiga-ui/core";
import {WeatherService} from "../services/weather.service";
import {map, tap} from "rxjs";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {DayWeatherComponent} from "../../../modules/day-weather/components/day-weather.component";
import {IDayWeather} from "../../../base/interfaces/weather.interface";
import {CurrentDayWeatherComponent} from "../../../modules/current-day-weather/components/current-day-weather.component";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        TuiInputModule,
        ReactiveFormsModule,
        TuiButtonModule,
        NgForOf,
        AsyncPipe,
        DayWeatherComponent,
        DatePipe,
        NgIf,
        CurrentDayWeatherComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    providers: [WeatherService]
})
export class MainComponent {
    protected _searchForm: FormGroup;
    protected _currentDay!: IDayWeather;

    constructor(private _formBuilder: FormBuilder, protected _weatherService: WeatherService) {
        this._searchForm = this._formBuilder.group({
            cityControl: ['']
        })

        this._weatherService.getGeoLocality()
            .pipe(
                tap((city: string) => this.updateCityValue(city))
            ).subscribe()

        this._weatherService.getWeather()
            .pipe(
                map((days: IDayWeather[]) => days[0]),
                tap((day: IDayWeather) => this._currentDay = day)
            ).subscribe()
    }

    private updateCityValue(city: string): void {
        this._searchForm.controls['cityControl'].setValue(city, {onlySelf: false, emitEvent: false})
    }

    protected searchWeather(): void {
        this._weatherService.updateGeoPosition(this._searchForm.controls['cityControl'].value)
    }
}
