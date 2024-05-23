import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {IDayWeather} from "../../../base/interfaces/weather.interface";

@Directive({
  selector: '[dayWeather]',
  standalone: true
})
export class FilterHoursWeatherDirective implements OnInit{
    protected hoursWeather: any;

    @Input() set dayWeather(day: IDayWeather) {
        this.filterHours(day)
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,) {}

    ngOnInit(): void {
        this.viewContainer.createEmbeddedView(this.templateRef, {weather: this.hoursWeather})
    }

    private filterHours(day: IDayWeather) {
        const opt: string[] = ['0', '4', '8', '12', '16', '20']
        this.hoursWeather = day.hours.filter((hour) => opt.includes(hour.hour))
    }


}
