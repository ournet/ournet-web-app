const MetnoSymbols = require('metno-symbols');


export class WeatherHelpers {
    static iconName(id: number, lang: string): string {
        return MetnoSymbols.symbolName(id, lang);
    }
}
