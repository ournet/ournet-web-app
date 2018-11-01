
import { HoroscopeBaseHandler } from "./handler";
import { HoroscopeAppData } from "../data";
import { SignViewModelBuilder, SignViewModelInput } from "../view-models/sign-view-model";
import { SignPage } from "../views/sign/sign-page";

export class SignHandler extends HoroscopeBaseHandler<SignViewModelInput> {
    async handle(data: HoroscopeAppData) {
        const viewData = await new SignViewModelBuilder(this.input, data).build();

        this.setCacheControl(60);

        return this.render(SignPage(viewData));
    }
}
