
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { IndexViewModelBuilder } from "../view-models/index-view-model";
import { IndexPage } from '../views/index/index-page';

export class IndexHandler extends HoroscopeBaseHandler {
    async handle(data: HoroscopeAppData) {
        const viewData = await new IndexViewModelBuilder(this.input, data).build();

        this.setCacheControl(60);
        
        return this.render(IndexPage(viewData));
    }
}
