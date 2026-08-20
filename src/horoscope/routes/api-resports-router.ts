import { HoroscopeBaseRouter } from "../router";
import { Request, Response } from "../../base/types";
import { HoroscopeBaseHandler } from "../handlers/handler";
import { HoroscopeAppData } from "../data";
import {
  HoroscopeViewModelBuilder,
  HoroscopeViewModel
} from "../view-models/horoscope-view-model";
import { HoroscopeReport } from "@ournet/api-client";
import { OurnetViewModelInput } from "../../ournet/view-model";
import { HoroscopesHelper, HoroscopeSign } from "@ournet/horoscopes-domain";
import logger from "../../logger";

export class ApiReportsRouter extends HoroscopeBaseRouter {
  constructor() {
    super("/api/reports.json");
  }
  protected createHander(req: Request, res: Response) {
    const input = this.formatInput<ApiReportsViewModelInput>(req, res);
    input.period = input.url.query.period as string;
    input.client = input.url.query.client as string;
    return new ApiReportsHandler(input);
  }
}

class ApiReportsHandler extends HoroscopeBaseHandler<ApiReportsViewModelInput> {
  async handle(appData: HoroscopeAppData) {
    if (!this.input.client) {
      return this.send({ message: `Param 'client' is required!` }, 400);
    }

    logger.warn(`api reports ${this.input.client}`);

    let period = this.input.period;

    if (period && !/^[WD]\d+$/.test(period)) {
      return this.send(
        { message: `Param 'period' is invalid. Example: D20181018` },
        400
      );
    }

    const model = await new ApiReportsViewModelBuilder(
      this.input,
      appData
    ).build();

    period = period || model.currentDayPeriod;

    this.setCacheControl(model.reports.length > 0 ? 60 * 12 : 1);

    return this.send({ data: { period, reports: model.reports || [] } }, 200);
  }
}

class ApiReportsViewModelBuilder extends HoroscopeViewModelBuilder<
  ApiReportsViewModel,
  ApiReportsViewModelInput
> {
  build() {
    const { lang, currentDayPeriod } = this.model;

    const period = this.input.period || currentDayPeriod;

    const reportLang = (this.input.url.query.lang as string) || lang;

    const fields =
      "id lang sign text period numbers stats {love health success}";

    if (isGeneratablePeriod(period, currentDayPeriod)) {
      // generateReports e idempotent: rapoartele existente se întorc ca
      // atare, doar cele lipsă se creează — deci e sigur de chemat mereu.
      this.apiClient.horoscopesGenerateReports(
        "reports",
        { fields },
        { params: { lang: reportLang, period } }
      );
    } else {
      const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((sign) =>
        HoroscopesHelper.createReportId(
          period,
          reportLang,
          sign as HoroscopeSign
        )
      );

      this.apiClient.horoscopesReportsByIds("reports", { fields }, { ids });
    }

    return super.build();
  }

  protected formatModelData(data: ApiReportsViewModel) {
    const model = super.formatModelData(data);
    model.reports = (model.reports || []).sort((a, b) => a.sign - b.sign);

    return model;
  }
}

// Doar zilele din [azi, azi+7] se generează la cerere — trecutul și
// perioadele W rămân read-only, ca să nu poată umple nimeni baza cu
// perioade arbitrare.
function isGeneratablePeriod(period: string, currentDayPeriod: string) {
  if (!/^D\d{8}$/.test(period) || !/^D\d{8}$/.test(currentDayPeriod)) {
    return false;
  }
  const day = period.substr(1);
  const today = currentDayPeriod.substr(1);

  return day >= today && day <= addDaysToDay(today, 7);
}

function addDaysToDay(yyyymmdd: string, days: number) {
  const date = new Date(
    Date.UTC(
      parseInt(yyyymmdd.slice(0, 4), 10),
      parseInt(yyyymmdd.slice(4, 6), 10) - 1,
      parseInt(yyyymmdd.slice(6, 8), 10)
    )
  );
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

interface ApiReportsViewModelInput extends OurnetViewModelInput {
  period?: string;
  client: string;
}

interface ApiReportsViewModel extends HoroscopeViewModel {
  reports: HoroscopeReport[];
}
