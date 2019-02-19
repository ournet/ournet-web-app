
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { WidgetsViewModelBuilder } from "../view-models/widget-view-model";
import { WidgetsPage } from "../views/widgets/widgets-page";

export class WidgetsHandler extends HoroscopeBaseHandler {
    async handle(data: HoroscopeAppData) {
        const viewData = await new WidgetsViewModelBuilder(this.input, data).build();

        this.setCacheControl(60 * 3);

        return this.render(WidgetsPage(viewData));
    }
}
