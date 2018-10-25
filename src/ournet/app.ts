import { IOurnetAppApi, OurnetProjectName, createOurnetAppApi } from "./app-api";
import { IRoute } from "../app/route";
import { App } from "../app/app";

export abstract class OurnetApp<API extends IOurnetAppApi> extends App<API> {

    constructor(routes: IRoute[], protected readonly project: OurnetProjectName) {
        super(routes);
    }

    protected createApi() {
        return createOurnetAppApi<API>(this.project);
    }
}
