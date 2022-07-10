export class Weekdays {
    private static WEEKDAYS_MAPPING: any = {
        0: 'Lunes',
        1: 'Martes',
        2: 'Miércoles',
        3: 'Jueves',
        4: 'Viernes',
        5: 'Sábado',
        6: 'Domingo',
    };

    public static all(): Array<number> {
        return Object.keys(this.WEEKDAYS_MAPPING).map((x: string) =>
            parseInt(x)
        );
    }

    public static map(value: number): string {
        return this.WEEKDAYS_MAPPING[value];
    }

    public static mapShort(value: number): string {
        return this.WEEKDAYS_MAPPING[value][0];
    }
}
