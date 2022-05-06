const MetnoSymbols = require("metno-symbols");

export class WeatherHelpers {
  static iconName(id: number, lang: string): string {
    return MetnoSymbols.symbolName(id, lang);
  }

  static iconUrl(id: number) {
    let iconId = id;
    switch (id) {
      case 2:
        iconId = 2;
        break;
      case 3:
        iconId = 4;
        break;
      case 4:
        iconId = 7;
        break;
      case 5:
      case 6:
      case 9:
      case 22:
        iconId = 33;
        break;
      case 7:
      case 20:
      case 24:
      case 23:
      case 26:
      case 30:
      case 31:
      case 40:
      case 42:
      case 46:
      case 47:
        iconId = 33;
        break;
      case 8:
      case 21:
      case 28:
      case 33:
      case 44:
      case 49:
        iconId = 29;
        break;

      case 9:
      case 22:
        iconId = 33;
        break;

      case 10:
      case 25:
      case 41:
        iconId = 19;
        break;

      case 11:
        iconId = 22;
        break;

      case 12:
      case 27:
      case 32:
      case 43:
      case 48:
        iconId = 27;
        break;

      case 13:
      case 29:
      case 45:
      case 50:
        iconId = 30;
        break;

      case 14:
      case 34:
        iconId = 31;
        break;
      case 15:
        iconId = 10;
        break;

      default:
        iconId = 1;
        break;
    }
    return `https://c.tadst.com/gfx/w/svg/wt-${iconId}.svg`;
  }
}
