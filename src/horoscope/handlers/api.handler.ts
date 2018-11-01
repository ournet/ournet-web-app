
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { ApiViewModelBuilder } from "../view-models/api-view-model";
import { ApiPage } from "../views/api/api-page";

export class ApiHandler extends HoroscopeBaseHandler {
    async handle(data: HoroscopeAppData) {
        const viewData = await new ApiViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 24);

        return this.render(ApiPage(viewData));
    }
}
