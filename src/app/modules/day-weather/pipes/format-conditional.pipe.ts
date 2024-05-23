import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatConditional',
    standalone: true
})
export class FormatConditionalPipe implements PipeTransform {

    transform(value: string): string {
        const options: {[key: string]: string} = {
            'clear': 'Ясно',
            'partly-cloudy': 'Малооблачно',
            'cloudy': 'Облачно с прояснениями',
            'overcast': 'Пасмурно',
            'light-rain': 'Небольшой дождь',
            'rain': 'Нождь',
            'heavy-rain': 'Сильный дождь',
            'showers': 'Ливень',
            'wet-snow': 'Дождь со снегом',
            'light-snow': 'Небольшой снег',
            'snow': 'Снег',
            'snow-showers': 'Снегопад',
            'hail': 'Град',
            'thunderstorm': 'Гроза',
            'thunderstorm-with-rain': 'Дождь с грозой',
            'thunderstorm-with-hail': 'Гроза с градом',

        }
        return options[value]
    }

}
