import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {IDayWeather} from "../../../base/interfaces/weather.interface";

@Directive({
    selector: '[formatDate]',
    standalone: true
})
export class FormatDateDirective implements OnInit {
    private weekDay! : string;
    @Input() set formatDate (day: IDayWeather) {
        this.getWeekDay(day.date);
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,) {}

    ngOnInit(): void {
        this.viewContainer.createEmbeddedView(this.templateRef, {weekDay: this.weekDay})
    }

    private getWeekDay(date: string): void {
        const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        this.weekDay = days[new Date(date).getDay()]
    }
}
