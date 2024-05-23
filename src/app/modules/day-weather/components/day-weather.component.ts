import {Component, Input} from '@angular/core';
import {IDayWeather} from "../../../base/interfaces/weather.interface";
import {FormatDateDirective} from "../directives/format-date.directive";
import {FormatTempPipe} from "../../../base/pipes/format-temp.pipe";
import {FormatConditionalPipe} from "../pipes/format-conditional.pipe";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-day-weather',
  standalone: true,
    imports: [FormatDateDirective, FormatTempPipe, FormatConditionalPipe, DatePipe, NgIf],
  templateUrl: './day-weather.component.html',
  styleUrl: './day-weather.component.scss'
})
export class DayWeatherComponent {
    protected weatherDay!: IDayWeather;
    @Input() set day (day: IDayWeather) {
        if (new Date(day.date).getDate() !== new Date().getDate()) {
            this.weatherDay = day;
        }
    }



}
