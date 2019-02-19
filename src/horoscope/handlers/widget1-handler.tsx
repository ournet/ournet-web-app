
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { Widget1ViewModelBuilder } from "../view-models/widget1-view-model";
import { Widget1Frame } from "../views/widgets/widget1-frame";

export class Widget1Handler extends HoroscopeBaseHandler {
    async handle(data: HoroscopeAppData) {
        const viewData = await new Widget1ViewModelBuilder(this.input, data).build();

        this.setCacheControl(60);
        
        return this.render(Widget1Frame(viewData));
    }
}
