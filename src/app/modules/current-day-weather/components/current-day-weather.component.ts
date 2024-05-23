import {Component, Input} from '@angular/core';
import {IDayWeather} from "../../../base/interfaces/weather.interface";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormatConditionalPipe} from "../../day-weather/pipes/format-conditional.pipe";
import {FormatTempPipe} from "../../../base/pipes/format-temp.pipe";
import {FilterHoursWeatherDirective} from "../directives/filter-hours-weather.directive";

@Component({
  selector: 'app-current-day-weather',
  standalone: true,
    imports: [
        DatePipe,
        FormatConditionalPipe,
        FormatTempPipe,
        NgIf,
        NgForOf,
        FilterHoursWeatherDirective
    ],
  templateUrl: './current-day-weather.component.html',
  styleUrl: './current-day-weather.component.scss'
})
export class CurrentDayWeatherComponent {
    @Input({required: true}) currentDay!: IDayWeather;
}
