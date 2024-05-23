export interface IDayWeather {
    date: string,
    parts: {
        day: {
            temp_avg: number,
            wind_speed: number,
            icon: string,
            condition: string,
        },
        night: {
            temp_min: number,
        }
    },
    hours: {
        hour: string,
        temp: number,
        wind_speed: number,
        icon: string
    }[]
}
