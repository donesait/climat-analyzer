import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatTemp',
    standalone: true
})
export class FormatTempPipe implements PipeTransform {
    transform(value: number): string {
        if (value > 0) {
            return `+${value}°C`
        }
        return `${value}°C`
    }

}
